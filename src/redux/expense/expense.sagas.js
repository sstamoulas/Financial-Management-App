import { takeLatest, call, put, all } from 'redux-saga/effects';
import { 
  firestore,
  createFiscalMonthlyDocument, 
  updateFiscalMonthlyDocument, 
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './expense.actions';
import ExpenseActionTypes from './expense.types';
import { 
  defaultExpenses,
  defaultDeposits,
} from './expense.utils';

export function* fetchCollectionsAsync({payload: {selectedTable, selectedMonth, selectedYear}}) {
  try {
    const collectionRef = firestore.collection(`${selectedMonth.label}-${selectedYear.label}`);
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch(error) {
    try {
      yield put(createFiscalMonthlyDocument(`${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, defaultExpenses, defaultDeposits));
    } catch(error) {
      yield put(fetchCollectionsFailure(error.message));
    }
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ExpenseActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollectionsAsync
  );
}

export function* expenseSagas() {
  yield all([
    call(fetchCollectionsStart),
  ]);
}
