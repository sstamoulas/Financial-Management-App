import { takeLatest, call, put, all, select, fork, join } from 'redux-saga/effects';
import ExpenseActionTypes from './expense.types';
import { 
  firestore,
  createFiscalMonthlyDocument, 
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
import { defaultTable, updateArray } from './expense.utils';

export function* fetchCollectionsAsync(option) {
  let {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  if(option !== undefined && option.label) {
    selectedTable = option;
  }

  try {
    const docRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`).doc(selectedTable.label);
    const snapshot = yield docRef.get();

    yield put(fetchCollectionsSuccess(snapshot.data()));
  } catch(error) {
    try {
      yield call(createFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, defaultTable(selectedTable));
      
      const docRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`).doc(selectedTable.label);
      const snapshot = yield docRef.get();

      yield put(fetchCollectionsSuccess(snapshot.data()));
    } catch(error) {
      yield put(fetchCollectionsFailure(error.message));
    }
  }
}

export function* fetchTables() {
  try {
    const docRef = firestore.collection('meta').doc('tables');
    const snapshot = yield docRef.get();

    yield put(fetchTablesSuccess(snapshot.data()));
  } catch(error) {
    yield put(fetchTablesFailure(error.message));
  }
}

export function* fetchMonths() {
  try {
    const docRef = firestore.collection('meta').doc('months');
    const snapshot = yield docRef.get();

    yield put(fetchMonthsSuccess(snapshot.data()));
  } catch(error) {
    yield put(fetchMonthsFailure(error.message));
  }
}

export function* fetchYears() {
  try {
    const docRef = firestore.collection('meta').doc('years');
    const snapshot = yield docRef.get();
    
    yield put(fetchYearsSuccess(snapshot.data()));
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

  const total = !!expenses.length ? expenses.reduce((accumulator, currentExpense) => accumulator + parseFloat(currentExpense.paid), 0) : 0;

  try {
    const docRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`).doc('Overview');
    const snapshot = yield docRef.get();
    let items = snapshot.data();
    let index = items.expenses.findIndex(item => item.label === column)

    updateArray(items.expenses, index, total, 'paid')

    yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, 'Overview', items);
  } catch(error) {
    console.log(error.message)
  }
}

export function* updateCollectionsAsync({payload: {index, value, label, items}}) {
  const {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    yield updateArray(items, index, value, label);
    yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {expenses: items});

    yield put(updateCollectionsSuccess());
  } catch(error) {
    yield put(updateCollectionsFailure(error.message));
  }
}

export function* removeCollectionsAsync({payload: {index}}) {
  let {root: {data, selectedTable, selectedMonth, selectedYear}} = yield select();

  console.log(index, data)
  try {
    data = data.filter((expense, expenseIndex) => index !== expenseIndex);

    yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {expenses: data});

    const docRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`).doc(selectedTable.label);
    const snapshot = yield docRef.get();

    yield put(removeCollectionsSuccess(snapshot.data()));
  } catch(error) {
    yield put(removeCollectionsFailure(error.message));
  }
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

// export function* updateTable(option) {
//   try {
//     yield put(updateTableSuccess(option));
//   } catch(error) {
//     yield put(updateTableFailure(error.message));
//   }
// }

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
