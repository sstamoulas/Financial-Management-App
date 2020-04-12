import ExpenseActionTypes from './expense.types';

export const addExpenseStart = () => ({
  type: ExpenseActionTypes.ADD_EXPENSE,
});

export const removeCollectionRowStart = (index) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTION_ROW_START,
  payload: {index},
});

export const removeCollectionRowSuccess = ({expenses, deposits}) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTION_ROW_SUCCESS,
  payload: {expenses, deposits},
});

export const removeCollectionRowFailure = (errorMessage) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTION_ROW_FAILURE,
  payload: errorMessage,
});

export const updateMonthStart = (option) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_START,
  payload: {option},
});

export const updateMonthSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_SUCCESS,
  payload: {option},
});

export const updateMonthFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_FAILURE,
  payload: errorMessage,
});

export const updateYearStart = (option) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_START,
  payload: {option},
});

export const updateYearSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_SUCCESS,
  payload: {option},
});

export const updateYearFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_FAILURE,
  payload: errorMessage,
});

export const updateTableStart = (option) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_START,
  payload: {option},
});

export const updateTableSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_SUCCESS,
  payload: {option},
});

export const updateTableFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_FAILURE,
  payload: errorMessage,
});

export const updateCollectionsStart = (rowData, isExpense) => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_START,
  payload: {rowData, isExpense},
});

export const updateCollectionsSuccess = ({expenses, deposits}) => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_SUCCESS,
  payload: {expenses, deposits},
});

export const updateCollectionsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStart = () => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = ({expenses, deposits}) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: {expenses, deposits},
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
