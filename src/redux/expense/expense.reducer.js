import ExpenseActionTypes from './expense.types';
import { addItem, updateItem, removeItem } from './expense.utils';

const INITIAL_STATE = {
  data: [],
  tableOptions: undefined,
  selectedTable: undefined,
  monthOptions: undefined,
  selectedMonth: undefined,
  yearOptions: undefined,
  selectedYear: undefined,
  isFetching: false,
  isUpdating: false,
  errorMessage: undefined,
};

const expenseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ExpenseActionTypes.ADD_ITEM: 
      return {
        ...state,
        data: addItem(state.data),
      };
    case ExpenseActionTypes.REMOVE_ITEMS:
      return {
        ...state,
        data: removeItem(state.data, action.payload.index),
      };
    case ExpenseActionTypes.UPDATE_ITEMS:
      return {
        ...state,
        data: updateItem(state.data, {...action.payload}),
      };
    case ExpenseActionTypes.REMOVE_ITEMS_START:
    case ExpenseActionTypes.UPDATE_ITEMS_START:
    case ExpenseActionTypes.UPDATE_MONTH_START:
    case ExpenseActionTypes.UPDATE_YEAR_START:
    case ExpenseActionTypes.UPDATE_TABLE_START:
      return {
        ...state,
        isUpdating: true,
      };
    case ExpenseActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ExpenseActionTypes.REMOVE_ITEMS_SUCCESS:
    case ExpenseActionTypes.UPDATE_ITEMS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      };
    case ExpenseActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case ExpenseActionTypes.FETCH_MONTHS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        monthOptions: action.payload,
        selectedMonth: action.payload[(new Date()).getMonth()],
      };
    case ExpenseActionTypes.FETCH_YEARS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        yearOptions: action.payload,
        selectedYear: action.payload.filter((year) => {
          return year.label === (new Date()).getFullYear();
        })[0],
      };
    case ExpenseActionTypes.FETCH_TABLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tableOptions: action.payload,
        selectedTable: action.payload[0],
      };
    case ExpenseActionTypes.UPDATE_MONTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedMonth: action.payload.option,
      };
    case ExpenseActionTypes.UPDATE_YEAR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedYear: action.payload.option,
      };
    case ExpenseActionTypes.UPDATE_TABLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedTable: action.payload.option,
      };
    case ExpenseActionTypes.REMOVE_ITEMS_FAILURE:
    case ExpenseActionTypes.UPDATE_ITEMS_FAILURE:
    case ExpenseActionTypes.UPDATE_MONTH_FAILURE:
    case ExpenseActionTypes.UPDATE_YEAR_FAILURE:
    case ExpenseActionTypes.UPDATE_TABLE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errorMessage: action.payload,
      };
    case ExpenseActionTypes.FETCH_MONTHS_FAILURE:
    case ExpenseActionTypes.FETCH_YEARS_FAILURE:
    case ExpenseActionTypes.FETCH_TABLES_FAILURE:
    case ExpenseActionTypes.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

export default expenseReducer;
