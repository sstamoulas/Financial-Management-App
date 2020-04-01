import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage

import expenseReducer from './expense/expense.reducer';

const persistConfig = {
  key: 'root',
  storage, 
  // whitelist: ['cart']
}

const rootReducer = combineReducers({
  expense: expenseReducer,
});

export default persistReducer(persistConfig, rootReducer);
