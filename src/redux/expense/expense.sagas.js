import { takeLatest, call, put, all, select } from 'redux-saga/effects';
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
  updateCollectionsSuccess,
  updateCollectionsFailure,
  removeCollectionRowSuccess,
  removeCollectionRowFailure,
} from './expense.actions';
import { defaultTable, updateArray } from './expense.utils';

export function* fetchCollectionsAsync() {
  const {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

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

export function* updateCollectionsAsync({payload: {rowData, isExpense}}) {
  const {root: {selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    const { index, value, label, items, hasOwnTable } = rowData;

    yield updateArray(items, index, value, label);
    
    if(isExpense) {
      yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {expenses: items});
    }
    else {
      yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {deposits: items});
    }

    const docRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`).doc(selectedTable.label);
    const snapshot = yield docRef.get();

    yield put(updateCollectionsSuccess(snapshot.data()));
  } catch(error) {
    yield put(updateCollectionsFailure(error.message));
  }
}

export function* removeCollectionRowAsync({payload: {index}}) {
  let {root: {expenses, selectedTable, selectedMonth, selectedYear}} = yield select();

  try {
    expenses = expenses.filter((expense, expenseIndex) => index !== expenseIndex);

    yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {expenses});

    const docRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`).doc(selectedTable.label);
    const snapshot = yield docRef.get();

    yield put(removeCollectionRowSuccess(snapshot.data()));
  } catch(error) {
    yield put(removeCollectionRowFailure(error.message));
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

export function* updateTableAsync({payload: {option}}) {
  try {
    yield put(updateTableSuccess(option));

    yield fetchCollectionsAsync();
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

export function* updateCollectionsStart() {
  yield takeLatest(
    ExpenseActionTypes.UPDATE_COLLECTIONS_START, 
    updateCollectionsAsync
  );
}

export function* removeCollectionRowStart() {
  yield takeLatest(
    ExpenseActionTypes.REMOVE_COLLECTION_ROW_START,
    removeCollectionRowAsync
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
    call(updateCollectionsStart),
    call(removeCollectionRowStart),
    call(updateMonthStart),
    call(updateYearStart),
    call(updateTableStart),
  ]);
}
