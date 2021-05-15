import { takeLatest, call, put, all, select, fork, join } from 'redux-saga/effects';
import ExpenseActionTypes from './expense.types';
import {
  createFiscalMonthlyDocument,
  readFiscalMonthlyDocument,
  updateFiscalMonthlyDocument,
  updateMetaTable,
  addTableToOverview,
} from '../../firebase/firebase.utils';
import {
  fetchItemsStart,
  addMetaTableSuccess,
  addMetaTableFailure,
  removeMetaTableSuccess,
  removeMetaTableFailure,
  updateMonthSuccess,
  updateMonthFailure,
  updateYearSuccess,
  updateYearFailure,
  updateTableSuccess,
  updateTableFailure,
  fetchItemsSuccess,
  fetchItemsFailure,
  fetchTablesSuccess,
  fetchTablesFailure,
  fetchMonthsSuccess,
  fetchMonthsFailure,
  fetchYearsSuccess,
  fetchYearsFailure,
  updateItemsSuccess,
  updateItemsFailure,
  removeItemsSuccess,
  removeItemsFailure,
} from './expense.actions';
import { updateItem, generateTotal, months, years, tables } from './expense.utils';

export function* fetchItemsAsync() {
  let {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    const data = yield call(
      readFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      selectedTable.label
    );

    yield put(fetchItemsSuccess(data));
  } catch(error) {
    try {
      let metaTables = {tables: []};
      if(!selectedTable.value) {
        metaTables = yield call(
          readFiscalMonthlyDocument,
          'meta',
          'tables'
        );
      }

      if(metaTables === undefined) {
        metaTables = { tables: tables };
      }

      metaTables = {tables: metaTables.tables.filter((table) => table.value !== 0).map((table) => {
        return {...table, due: 0};
      })};

      yield call(
        createFiscalMonthlyDocument,
        `${selectedMonth.label}-${selectedYear.label}`,
        selectedTable.label, metaTables
      );

      const data = yield call(
        readFiscalMonthlyDocument,
        `${selectedMonth.label}-${selectedYear.label}`,
        selectedTable.label
      );

      yield put(fetchItemsSuccess(data));
    } catch(error) {
      yield put(fetchItemsFailure(error.message));
    }
  }
}

export function* addMetaTableAsync({ payload: { tableInfo }}) {
  let {root: { selectedMonth, selectedYear, tableOptions }} = yield select();

  try {
    yield put(fetchItemsStart());
    const tables = [...tableOptions, tableInfo]

    console.log(tableOptions, tableInfo, tables);
    yield call(updateMetaTable, tables);
    yield call(addTableToOverview, `${selectedMonth.label}-${selectedYear.label}`, tableInfo);
    const task = yield fork(fetchTables);
    yield join([task]);
    yield call(fetchItemsAsync);
    yield put(addMetaTableSuccess());
  } catch(error) {
    yield put(addMetaTableFailure(error));
  }
}

export function* removeMetaTableAsync({ payload: { selectedValue }}) {
  let {root: { tableOptions }} = yield select();

  try {
    yield put(fetchItemsStart());
    const tables = tableOptions
      .filter((table) => table.value !== selectedValue)
      .map((table) => {
        return {
          label: table.label, 
          value: table.value, 
          hasOwnTable: table.hasOwnTable, 
          isExpense: table.isExpense
        };
      });
    yield call(updateMetaTable, tables);
    const task = yield fork(fetchTables);
    yield join([task]);
    yield call(fetchItemsAsync);
    yield put(removeMetaTableSuccess());
  } catch(error) {
    yield put(removeMetaTableFailure(error));
  }
}

export function* fetchTables() {
  let {root: {selectedMonth, selectedYear}} = yield select();

  try {
    let data = yield call(
      readFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      'Overview'
    );

    const dataTables = data.tables.map((table) => {
      return {
        label: table.label, 
        value: table.value, 
        hasOwnTable: table.hasOwnTable, 
        isExpense: table.isExpense
      };
    });

    yield put(fetchTablesSuccess({tables: [...tables, ...dataTables]}));
  } catch(error) {
    try {
      let metaTables = yield call(
        readFiscalMonthlyDocument,
        'meta',
        'tables'
      );

      if(metaTables === undefined) {
        yield call(
          createFiscalMonthlyDocument,
          'meta',
          'tables', { tables: tables }
        );

        metaTables = yield call(
          readFiscalMonthlyDocument,
          'meta',
          'tables'
        );
      }

      yield put(fetchTablesSuccess(metaTables));
    } catch(error) {
      yield put(fetchTablesFailure(error.message));
    }
  }
}

export function* fetchMonths() {
  try {
    // const data = yield call(
    //   readFiscalMonthlyDocument,
    //   'meta',
    //   'months'
    // );

    yield put(fetchMonthsSuccess(months));
  } catch(error) {
    yield put(fetchMonthsFailure(error.message));
  }
}

export function* fetchYears() {
  try {
    // const data = yield call(
    //   readFiscalMonthlyDocument,
    //   'meta',
    //   'years'
    // );

    yield put(fetchYearsSuccess(years));
  } catch(error) {
    yield put(fetchYearsFailure(error.message));
  }
}

export function* fetchMetaAsync() {
  yield put(fetchItemsStart());
  const task1 = yield fork(fetchMonths);
  const task2 = yield fork(fetchYears);
  yield join([task1, task2]);
  const task3 = yield fork(fetchTables);
  yield join(task3);

  yield call(fetchItemsAsync);
}

export function* updateOverviewItemsAsync({payload: {tables, column}}) {
  const {root: {selectedMonth, selectedYear}} = yield select();

  const total = generateTotal(tables, 'paid');

  try {
    let data = yield call(
      readFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      'Overview'
    );

    let table = data.tables.filter(item => item.label === column)[0];

    let arr = yield updateItem(data.tables, {index: table.value, value: total, label: 'paid'})

    yield call(
      updateFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      'Overview',
      {'tables': arr},
    );
  } catch(error) {
    console.log(error.message)
  }
}

export function* updateItems(index, value, label, items) {
  const {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    yield updateItem(items, {index, value, label});
    yield call(
      updateFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      selectedTable.label,
      {tables: items}
    );

    yield put(updateItemsSuccess());
  } catch(error) {
    yield put(updateItemsFailure(error.message));
  }
}

export function* updateItemsAsync({payload: {index, value, label}}) {
  let {root: {data, selectedTable}} = yield select();

  const task = yield fork(updateItems, index, value, label, data);
  yield join(task);

  // If this is the Overview Table then do not update it
  if(selectedTable.value) {
    yield updateOverviewItemsAsync({payload: {tables: data, column: selectedTable.label}});
  }
}

export function* removeItems(index) {
  let {root: {data, selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    yield call(
      updateFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      selectedTable.label,
      {tables: data}
    );

    let items = yield call(
      readFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      selectedTable.label
    );

    yield put(removeItemsSuccess(items));
  } catch(error) {
    yield put(removeItemsFailure(error.message));
  }
}

export function* removeItemsAsync({payload: {index}}) {
  let {root: {data, selectedTable}} = yield select();

  const task = yield fork(removeItems, index);
  yield join(task);

  yield updateOverviewItemsAsync({payload: {tables: data, column: selectedTable.label}});
}

export function* updateMonthAsync({payload: {selectedValue}}) {
  const {root: {monthOptions}} = yield select();

  try {
    yield put(fetchItemsStart());
    const option = monthOptions.find((option) => option.value === selectedValue);
    yield put(updateMonthSuccess(option));

    yield call(fetchTables);
    yield call(fetchItemsAsync);
  } catch(error) {
    yield put(updateMonthFailure(error.message));
  }
}

export function* updateYearAsync({payload: {selectedValue}}) {
  const {root: {yearOptions}} = yield select();

  try {
    yield put(fetchItemsStart());
    const option = yearOptions.find((option) => option.value === selectedValue);
    yield put(updateYearSuccess(option));
    
    yield call(fetchTables);
    yield call(fetchItemsAsync);
  } catch(error) {
    yield put(updateYearFailure(error.message));
  }
}

export function* updateTableAsync({payload: {selectedValue}}) {
  const {root: {tableOptions}} = yield select();

  try {
    yield put(fetchItemsStart());
    const option = tableOptions.find((option) => option.value === selectedValue);
    yield put(updateTableSuccess(option));

    yield call(fetchItemsAsync);
  } catch(error) {
    yield put(updateTableFailure(error.message));
  }
}

export function* fetchMetaStart() {
  yield takeLatest(
    ExpenseActionTypes.FETCH_META_START,
    fetchMetaAsync
  );
}

export function* addMetaTableStart() {
  yield takeLatest(
    ExpenseActionTypes.ADD_META_TABLE_START,
    addMetaTableAsync
  );
}

export function* removeMetaTableStart() {
  yield takeLatest(
    ExpenseActionTypes.REMOVE_META_TABLE_START,
    removeMetaTableAsync
  );
}

export function* updateItemsStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_ITEMS_START,
    updateItemsAsync
  );
}

export function* updateOverviewItemsStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_OVERVIEW_ITEMS_START,
    updateOverviewItemsAsync
  );
}

export function* removeItemsStart() {
  yield takeLatest(
    ExpenseActionTypes.REMOVE_ITEMS_START,
    removeItemsAsync
  );
}

export function* updateMonthStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_MONTH_START,
    updateMonthAsync
  );
}

export function* updateYearStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_YEAR_START,
    updateYearAsync
  );
}

export function* updateTableStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_TABLE_START,
    updateTableAsync
  );
}

export function* expenseSagas() {
  yield all([
    call(fetchMetaStart),
    call(addMetaTableStart),
    call(removeMetaTableStart),
    call(updateItemsStart),
    call(updateOverviewItemsStart),
    call(removeItemsStart),
    call(updateMonthStart),
    call(updateYearStart),
    call(updateTableStart),
  ]);
}
