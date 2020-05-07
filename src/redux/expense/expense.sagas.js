import { takeLatest, call, put, all, select, fork, join } from 'redux-saga/effects';
import ExpenseActionTypes from './expense.types';
import {
  createFiscalMonthlyDocument,
  readFiscalMonthlyDocument,
  updateFiscalMonthlyDocument,
} from '../../firebase/firebase.utils';
import {
  fetchItemsStart,
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
import { updateItem, generateTotal } from './expense.utils';

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
      let expenses = {expenses: []};
      if(!selectedTable.value) {
        expenses = yield call(
          readFiscalMonthlyDocument,
          'meta',
          'defaultTable'
        );
      }

      yield call(
        createFiscalMonthlyDocument,
        `${selectedMonth.label}-${selectedYear.label}`,
        selectedTable.label, expenses
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

export function* fetchTables() {
  try {
    const data = yield call(
      readFiscalMonthlyDocument,
      'meta',
      'tables'
    );

    yield put(fetchTablesSuccess(data));
  } catch(error) {
    yield put(fetchTablesFailure(error.message));
  }
}

export function* fetchMonths() {
  try {
    const data = yield call(
      readFiscalMonthlyDocument,
      'meta',
      'months'
    );

    yield put(fetchMonthsSuccess(data));
  } catch(error) {
    yield put(fetchMonthsFailure(error.message));
  }
}

export function* fetchYears() {
  try {
    const data = yield call(
      readFiscalMonthlyDocument,
      'meta',
      'years'
    );

    yield put(fetchYearsSuccess(data));
  } catch(error) {
    yield put(fetchYearsFailure(error.message));
  }
}

export function* fetchMetaAsync() {
  yield put(fetchItemsStart());
  const task1 = yield fork(fetchTables);
  const task2 = yield fork(fetchMonths);
  const task3 = yield fork(fetchYears);
  yield join([task1, task2, task3]);

  yield call(fetchItemsAsync);
}

export function* updateOverviewItemsAsync({payload: {expenses, column}}) {
  const {root: {selectedMonth, selectedYear}} = yield select();

  const total = generateTotal(expenses, 'paid');

  try {
    let data = yield call(
      readFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      'Overview'
    );

    let index = data.expenses.findIndex(item => item.label === column)

    let arr = yield updateItem(data.expenses, {index, value: total, label: 'paid'})

    yield call(
      updateFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      'Overview',
      {'expenses': arr},
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
      {expenses: items}
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
    let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
    yield updateOverviewItemsAsync({payload: {expenses: data, column: tableName}});
  }
}

export function* removeItems(index) {
  let {root: {data, selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    yield call(
      updateFiscalMonthlyDocument,
      `${selectedMonth.label}-${selectedYear.label}`,
      selectedTable.label,
      {expenses: data}
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

  let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
  yield updateOverviewItemsAsync({payload: {expenses: data, column: tableName}});
}

export function* updateMonthAsync({payload: {selectedIndex}}) {
  const {root: {monthOptions}} = yield select();

  try {
    yield put(fetchItemsStart());
    const option = monthOptions.find((option, index) => index === selectedIndex);
    yield put(updateMonthSuccess(option));

    yield call(fetchItemsAsync);
  } catch(error) {
    yield put(updateMonthFailure(error.message));
  }
}

export function* updateYearAsync({payload: {selectedIndex}}) {
  const {root: {yearOptions}} = yield select();

  try {
    yield put(fetchItemsStart());
    const option = yearOptions.find((option, index) => index === selectedIndex);
    yield put(updateYearSuccess(option));

    yield call(fetchItemsAsync);
  } catch(error) {
    yield put(updateYearFailure(error.message));
  }
}

export function* updateTableAsync({payload: {selectedIndex}}) {
  const {root: {tableOptions}} = yield select();

  try {
    yield put(fetchItemsStart());
    const option = tableOptions.find((option, index) => index === selectedIndex);
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
    call(updateItemsStart),
    call(updateOverviewItemsStart),
    call(removeItemsStart),
    call(updateMonthStart),
    call(updateYearStart),
    call(updateTableStart),
  ]);
}
