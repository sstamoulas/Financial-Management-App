import ExpenseActionTypes from './expense.types';

export const addMetaTableStart = (tableInfo) => ({
  type: ExpenseActionTypes.ADD_META_TABLE_START,
  payload: { tableInfo },
});

export const addMetaTableSuccess = () => ({
  type: ExpenseActionTypes.ADD_META_TABLE_SUCCESS,
});

export const addMetaTableFailure = (errorMessage) => ({
  type: ExpenseActionTypes.ADD_META_TABLE_FAILURE,
  payload: errorMessage,
});

export const removeMetaTableStart = (selectedValue) => ({
  type: ExpenseActionTypes.REMOVE_META_TABLE_START,
  payload: { selectedValue },
});

export const removeMetaTableSuccess = () => ({
  type: ExpenseActionTypes.REMOVE_META_TABLE_SUCCESS,
});

export const removeMetaTableFailure = (errorMessage) => ({
  type: ExpenseActionTypes.REMOVE_META_TABLE_FAILURE,
  payload: errorMessage,
});

export const addItem = () => ({
  type: ExpenseActionTypes.ADD_ITEM,
});

export const removeItems = (index) => ({
  type: ExpenseActionTypes.REMOVE_ITEMS,
  payload: {index},
});

export const updateItems = (index, value, label) => ({
  type: ExpenseActionTypes.UPDATE_ITEMS,
  payload: {index, value, label},
});

export const removeItemsStart = (index) => ({
  type: ExpenseActionTypes.REMOVE_ITEMS_START,
  payload: {index},
});

export const removeItemsSuccess = ({expenses}) => ({
  type: ExpenseActionTypes.REMOVE_ITEMS_SUCCESS,
  payload: expenses,
});

export const removeItemsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.REMOVE_ITEMS_FAILURE,
  payload: errorMessage,
});

export const updateItemsStart = (index, value, label) => ({
  type: ExpenseActionTypes.UPDATE_ITEMS_START,
  payload: {index, value, label},
});

export const updateItemsSuccess = () => ({
  type: ExpenseActionTypes.UPDATE_ITEMS_SUCCESS,
});

export const updateItemsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_ITEMS_FAILURE,
  payload: errorMessage,
});

export const updateOverviewItemsStart = (tables, column) => ({
  type: ExpenseActionTypes.UPDATE_OVERVIEW_ITEMS_START,
  payload: {tables, column},
});

export const updateMonthStart = (selectedValue) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_START,
  payload: {selectedValue},
});

export const updateMonthSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_SUCCESS,
  payload: {option},
});

export const updateMonthFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_MONTH_FAILURE,
  payload: errorMessage,
});

export const updateYearStart = (selectedValue) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_START,
  payload: {selectedValue},
});

export const updateYearSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_SUCCESS,
  payload: {option},
});

export const updateYearFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_YEAR_FAILURE,
  payload: errorMessage,
});

export const updateTableStart = (selectedValue) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_START,
  payload: {selectedValue},
});

export const updateTableSuccess = (option) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_SUCCESS,
  payload: {option},
});

export const updateTableFailure  = (errorMessage) => ({
  type: ExpenseActionTypes.UPDATE_TABLE_FAILURE,
  payload: errorMessage,
});

export const fetchMetaStart = () => ({
  type: ExpenseActionTypes.FETCH_META_START,
});

export const fetchMonthsSuccess = (months) => ({
  type: ExpenseActionTypes.FETCH_MONTHS_SUCCESS,
  payload: months,
});

export const fetchMonthsFailure = ({errorMessage}) => ({
  type: ExpenseActionTypes.FETCH_MONTHS_FAILURE,
  payload: errorMessage,
});

export const fetchYearsSuccess = (years) => ({
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

export const fetchItemsSuccess = ({tables}) => ({
  type: ExpenseActionTypes.FETCH_ITEMS_SUCCESS,
  payload: tables,
});

export const fetchItemsFailure = (errorMessage) => ({
  type: ExpenseActionTypes.FETCH_ITEMS_FAILURE,
  payload: errorMessage,
});
