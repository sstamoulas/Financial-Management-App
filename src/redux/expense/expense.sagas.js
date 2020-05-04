import { takeLatest, call, put, all, select, fork, join } from 'redux-saga/effects';
import ExpenseActionTypes from './expense.types';
import { 
  createFiscalMonthlyDocument, 
  readFiscalMonthlyDocument,
  updateFiscalMonthlyDocument,
} from '../../firebase/firebase.utils';
import { 
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
  updateItemSuccess,
  updateItemFailure,
  removeItemSuccess,
  removeItemFailure,
} from './expense.actions';
import { updateArray, generateTotal } from './expense.utils';

export function* fetchItemsAsync(option) {
  let {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  if(option !== undefined && option.label) {
    selectedTable = option;
  }

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

    updateArray(data.expenses, index, total, 'paid')

    yield call(
      updateFiscalMonthlyDocument, 
      `${selectedMonth.label}-${selectedYear.label}`, 
      'Overview', 
      data
    );
  } catch(error) {
    console.log(error.message)
  }
}

export function* updateItem(index, value, label, items) {
  const {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    yield updateArray(items, index, value, label);
    yield call(
      updateFiscalMonthlyDocument, 
      `${selectedMonth.label}-${selectedYear.label}`, 
      selectedTable.label, 
      {expenses: items}
    );

    yield put(updateItemSuccess());
  } catch(error) {
    yield put(updateItemFailure(error.message));
  }
}

export function* updateItemAsync({payload: {index, value, label}}) {
  let {root: {data, selectedTable}} = yield select();

  const task = yield fork(updateItem, index, value, label, data);
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

    yield put(removeItemSuccess(items));
  } catch(error) {
    yield put(removeItemFailure(error.message));
  }
}

export function* removeItemAsync({payload: {index}}) {
  let {root: {data, selectedTable}} = yield select();

  const task = yield fork(removeItems, index);
  yield join(task);

  let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
  yield updateOverviewItemsAsync({payload: {expenses: data, column: tableName}});
}

export function* updateMonthAsync({payload: {selectedIndex}}) {
  const {root: {monthOptions}} = yield select();

  try {
    const option = monthOptions.find((option, index) => index === selectedIndex);
    yield put(updateMonthSuccess(option));
    yield fetchItemsAsync();
  } catch(error) {
    yield put(updateMonthFailure(error.message));
  }
}

export function* updateYearAsync({payload: {selectedIndex}}) {
  const {root: {yearOptions}} = yield select();
  try {
    const option = yearOptions.find((option, index) => index === selectedIndex);
    yield put(updateYearSuccess(option));
    yield fetchItemsAsync();
  } catch(error) {
    yield put(updateYearFailure(error.message));
  }
}

export function* updateTableAsync({payload: {selectedIndex}}) {
  const {root: {tableOptions}} = yield select();
  try {
    const option = tableOptions.find((option, index) => index === selectedIndex);
    const task = yield fork(fetchItemsAsync, option);
    yield join(task);

    yield put(updateTableSuccess(option));
  } catch(error) {
    yield put(updateTableFailure(error.message));
  }
}

export function* fetchItemsStart() {
  yield takeLatest(
    ExpenseActionTypes.FETCH_ITEMS_START, 
    fetchItemsAsync
  );
}

export function* fetchMetaStart() {
  yield takeLatest(
    ExpenseActionTypes.FETCH_META_START,
    fetchMetaAsync
  );
}

export function* updateItemStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_ITEM_START, 
    updateItemAsync
  );
}

export function* updateOverviewItemsStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_OVERVIEW_ITEM_START, 
    updateOverviewItemsAsync
  );
}

export function* removeItemStart() {
  yield takeLatest(
    ExpenseActionTypes.REMOVE_ITEM_START,
    removeItemAsync
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
    call(fetchItemsStart),
    call(fetchMetaStart),
    call(updateItemStart),
    call(updateOverviewItemsStart),
    call(removeItemStart),
    call(updateMonthStart),
    call(updateYearStart),
    call(updateTableStart),
  ]);
}
