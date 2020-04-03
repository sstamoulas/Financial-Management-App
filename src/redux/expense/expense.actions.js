import ExpenseActionTypes from './expense.types';

export const addExpenseStart = () => ({
  type: ExpenseActionTypes.ADD_EXPENSE,
});

export const removeExpenseStart = (index) => ({
  type: ExpenseActionTypes.REMOVE_EXPENSE,
  payload: {index},
});

export const updateExpenseStart = (e, type, label) => ({
  type: ExpenseActionTypes.UPDATE_EXPENSE,
  payload: {value: e.target.value, type, label},
});

export const updateDepositStart = (e, type, label) => ({
  type: ExpenseActionTypes.UPDATE_DEPOSIT,
  payload: {value: e.target.value, type, label},
});

export const updateMonth = (option) => ({
  type: ExpenseActionTypes.UPDATE_MONTH,
  payload: {option},
});

export const updateYear = (option) => ({
  type: ExpenseActionTypes.UPDATE_YEAR,
  payload: {option},
});

export const updateTable = (option) => ({
  type: ExpenseActionTypes.UPDATE_TABLE,
  payload: {option},
});

export const fetchCollectionsStart = (selectedTable, selectedMonth, selectedYear) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_START,
  payload: {selectedTable, selectedMonth, selectedYear},
});

export const fetchCollectionsSuccess = ({expenses, deposits}) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: {expenses, deposits},
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
