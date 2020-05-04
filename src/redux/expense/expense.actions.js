import ExpenseActionTypes from './expense.types';

export const addItem = () => ({
  type: ExpenseActionTypes.ADD_ITEM,
});

export const removeItem = (index) => ({
  type: ExpenseActionTypes.REMOVE_ITEM,
  payload: {index},
});

export const updateItem = (index, paid, label) => ({
  type: ExpenseActionTypes.UPDATE_ITEM,
  payload: {index, paid, label},
});

export const removeItemStart = (index) => ({
  type: ExpenseActionTypes.REMOVE_ITEM_START,
  payload: {index},
});

export const removeItemSuccess = ({expenses}) => ({
  type: ExpenseActionTypes.REMOVE_ITEM_SUCCESS,
  payload: expenses,
});

export const removeItemFailure = (errorMessage) => ({
  type: ExpenseActionTypes.REMOVE_ITEM_FAILURE,
  payload: errorMessage,
});

export const updateItemStart = (index, value, label) => ({
  type: ExpenseActionTypes.UPDATE_ITEM_START,
  payload: {index, value, label},
});

export const updateItemSuccess = () => ({
  type: ExpenseActionTypes.UPDATE_ITEM_SUCCESS,
});

export const updateItemFailure = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_ITEM_FAILURE,
  payload: errorMessage,
});

export const updateMonthStart = (selectedIndex) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_START,
  payload: {selectedIndex},
});

export const updateMonthSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_SUCCESS,
  payload: {option},
});

export const updateMonthFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_FAILURE,
  payload: errorMessage,
});

export const updateYearStart = (selectedIndex) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_START,
  payload: {selectedIndex},
});

export const updateYearSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_SUCCESS,
  payload: {option},
});

export const updateYearFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_FAILURE,
  payload: errorMessage,
});

export const updateTableStart = (selectedIndex) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_START,
  payload: {selectedIndex},
});

export const updateTableSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_SUCCESS,
  payload: {option},
});

export const updateTableFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_FAILURE,
  payload: errorMessage,
});

export const updateOverviewItemsStart = (expenses, column) => ({
  type: ExpenseActionTypes.UPDATE_OVERVIEW_ITEM_START,
  payload: {expenses, column},
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

export const fetchItemsStart = () => ({
  type: ExpenseActionTypes.FETCH_ITEMS_START,
});

export const fetchItemsSuccess = ({expenses}) => ({
  type: ExpenseActionTypes.FETCH_ITEMS_SUCCESS,
  payload: expenses,
});

export const fetchItemsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.FETCH_ITEMS_FAILURE,
  payload: errorMessage,
});
