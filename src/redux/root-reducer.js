import { combineReducers } from 'redux';

import expenseReducer from './expense/expense.reducer';

const rootReducer = combineReducers({
  root: expenseReducer,
});

export default rootReducer;
