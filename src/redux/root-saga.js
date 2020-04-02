import { all, call } from 'redux-saga/effects';

import { expenseSagas } from './expense/expense.sagas';

export default function* rootSaga() {
  yield all([
    call(expenseSagas),
  ]);
}
