import { takeLatest, call, put, all } from 'redux-saga/effects';
import ExpenseActionTypes from './expense.types';
import { 
  firestore,
  createFiscalMonthlyDocument, 
  updateFiscalMonthlyDocument,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
import { 
  fetchCollectionsSuccess, 
  fetchCollectionsFailure,
  updateCollectionsSuccess,
  updateCollectionsFailure
} from './expense.actions';
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

export function* updateCollectionsAsync({payload: {expenses, deposits, isExpense, selectedTable, selectedMonth, selectedYear}}) {
  try {
    if(isExpense) {
      expenses = yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {expenses: expenses});
    }
    else {
      updateArray(deposits, value, type, label);
      deposits = yield call(updateFiscalMonthlyDocument, `${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {deposits: deposits});
    }

    yield put(updateCollectionsSuccess({expenses, deposits}));
  } catch(error) {
    yield put(updateCollectionsFailure(error.message));
  }
}

const updateArray = (arrayItems, value, type, label) => {
  console.log(arrayItems, value, type, label);
  if(!isNaN(value)) {
    let index = arrayItems.map(item => item.expenseType).indexOf(type);
    console.log(index);

    if(value === "") {
      arrayItems[index][label] = 0;
    }
    else {
      arrayItems[index][label] = value;
    }
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

export function* expenseSagas() {
  yield all([
    call(fetchCollectionsStart),
    call(updateCollectionsStart),
  ]);
}
