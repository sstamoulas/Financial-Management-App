import ExpenseActionTypes from './expense.types';

export const addExpenseStart = () => ({
  type: ExpenseActionTypes.ADD_EXPENSE,
});

export const removeCollectionsStart = (index) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTIONS_START,
  payload: {index},
});

export const removeCollectionsSuccess = ({expenses}) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTIONS_SUCCESS,
  payload: expenses,
});

export const removeCollectionsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTIONS_FAILURE,
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

export const updateOverviewCollectionsStart = (expenses, column) => ({
  type: ExpenseActionTypes.UPDATE_OVERVIEW_COLLECTIONS_START,
  payload: {expenses, column},
});

export const removeCollectionsLocalState = (index) => ({
  type: ExpenseActionTypes.REMOVE_COLLECTIONS_LOCAL_STATE,
  payload: {index},
});

export const updateCollectionsLocalState = (index, paid, label) => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_LOCAL_STATE,
  payload: {index, paid, label},
});

export const updateCollectionsStart = ({index, value, label, items}) => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_START,
  payload: {index, value, label, items},
});

export const updateCollectionsSuccess = () => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_SUCCESS,
});

export const updateCollectionsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchMetaStart = () => ({
  type: ExpenseActionTypes.FETCH_META_START,
});

export const fetchMonthsSuccess = ({months}) => ({
  type: ExpenseActionTypes.FETCH_MONTHS_SUCCESS,
  payload: months,
});

export const fetchMonthsFailure = ({errorMessage}) => ({
  type: ExpenseActionTypes.FETCH_MONTHS_FAILURE,
  payload: errorMessage,
});

export const fetchYearsSuccess = ({years}) => ({
  type: ExpenseActionTypes.FETCH_YEARS_SUCCESS,
  payload: years,
});

export const fetchYearsFailure = ({errorMessage}) => ({
  type: ExpenseActionTypes.FETCH_YEARS_FAILURE,
  payload: errorMessage,
});

export const fetchTablesSuccess = ({tables}) => ({
  type: ExpenseActionTypes.FETCH_TABLES_SUCCESS,
  payload: tables,
});

export const fetchTablesFailure = ({errorMessage}) => ({
  type: ExpenseActionTypes.FETCH_TABLES_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStart = () => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = ({expenses}) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: expenses,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
