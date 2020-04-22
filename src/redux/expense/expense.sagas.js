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
  fetchCollectionsSuccess, 
  fetchCollectionsFailure,
  fetchTablesSuccess,
  fetchTablesFailure,
  fetchMonthsSuccess,
  fetchMonthsFailure,
  fetchYearsSuccess,
  fetchYearsFailure,
  updateCollectionsSuccess,
  updateCollectionsFailure,
  removeCollectionsSuccess,
  removeCollectionsFailure,
} from './expense.actions';
import { updateArray, generateTotal } from './expense.utils';

export function* fetchCollectionsAsync(option) {
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

    yield put(fetchCollectionsSuccess(data));
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

      yield put(fetchCollectionsSuccess(data));
    } catch(error) {
      yield put(fetchCollectionsFailure(error.message));
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

  yield call(fetchCollectionsAsync);
}

export function* updateOverviewCollectionsAsync({payload: {expenses, column}}) {
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

export function* updateCollections(index, value, label, items) {
  const {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    yield updateArray(items, index, value, label);
    yield call(
      updateFiscalMonthlyDocument, 
      `${selectedMonth.label}-${selectedYear.label}`, 
      selectedTable.label, 
      {expenses: items}
    );

    yield put(updateCollectionsSuccess());
  } catch(error) {
    yield put(updateCollectionsFailure(error.message));
  }
}

export function* updateCollectionsAsync({payload: {index, value, label, items}}) {
  let {root: {data, selectedTable}} = yield select();

  const task = yield fork(updateCollections, index, value, label, items);
  yield join(task);

  // If this is the Overview Table then do not update it
  if(selectedTable.value) {
    let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
    yield updateOverviewCollectionsAsync({payload: {expenses: data, column: tableName}});
  }
}

export function* removeCollections(index) {
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

    yield put(removeCollectionsSuccess(items));
  } catch(error) {
    yield put(removeCollectionsFailure(error.message));
  }
}

export function* removeCollectionsAsync({payload: {index}}) {
  let {root: {data, selectedTable}} = yield select();

  const task = yield fork(removeCollections, index);
  yield join(task);

  let tableName = selectedTable.label.substring(0, selectedTable.label.indexOf(' Expense'));
  yield updateOverviewCollectionsAsync({payload: {expenses: data, column: tableName}});
}

export function* updateMonthAsync({payload: {option}}) {
  try {
    yield put(updateMonthSuccess(option));
    yield fetchCollectionsAsync();
  } catch(error) {
    yield put(updateMonthFailure(error.message));
  }
}

export function* updateYearAsync({payload: {option}}) {
  try {
    yield put(updateYearSuccess(option));
    yield fetchCollectionsAsync();
  } catch(error) {
    yield put(updateYearFailure(error.message));
  }
}

export function* updateTableAsync({payload: {option}}) {
  try {
    const task = yield fork(fetchCollectionsAsync, option);
    yield join(task);

    yield put(updateTableSuccess(option));
  } catch(error) {
    yield put(updateTableFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ExpenseActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollectionsAsync
  );
}

export function* fetchMetaStart() {
  yield takeLatest(
    ExpenseActionTypes.FETCH_META_START,
    fetchMetaAsync
  );
}

export function* updateCollectionsStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_COLLECTIONS_START, 
    updateCollectionsAsync
  );
}

export function* updateOverviewCollectionsStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_OVERVIEW_COLLECTIONS_START, 
    updateOverviewCollectionsAsync
  );
}

export function* removeCollectionsStart() {
  yield takeLatest(
    ExpenseActionTypes.REMOVE_COLLECTIONS_START,
    removeCollectionsAsync
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
    call(fetchCollectionsStart),
    call(fetchMetaStart),
    call(updateCollectionsStart),
    call(updateOverviewCollectionsStart),
    call(removeCollectionsStart),
    call(updateMonthStart),
    call(updateYearStart),
    call(updateTableStart),
  ]);
}
