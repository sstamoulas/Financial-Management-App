import ExpenseActionTypes from './expense.types';
import { months, years, tables } from './expense.utils';

const INITIAL_STATE = {
  expenses: [],
  deposits: [],
  tableOptions: tables,
  selectedTable: tables[0],
  monthOptions: months,
  selectedMonth: months[(new Date()).getMonth()],
  yearOptions: years,
  selectedYear: years[0],
  isFetching: false,
  errorMessage: undefined,
};

const expenseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ExpenseActionTypes.ADD_EXPENSE: 
      return {
        ...state,
        expenses: [...state.expenses, {name: '', value: 0, date: ''}],
      };
    case ExpenseActionTypes.REMOVE_COLLECTION_ROW_START:
    case ExpenseActionTypes.UPDATE_MONTH_START:
    case ExpenseActionTypes.UPDATE_YEAR_START:
    case ExpenseActionTypes.UPDATE_TABLE_START:
    case ExpenseActionTypes.UPDATE_COLLECTIONS_START:
    case ExpenseActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ExpenseActionTypes.REMOVE_COLLECTION_ROW_SUCCESS:
    case ExpenseActionTypes.UPDATE_COLLECTIONS_SUCCESS:
    case ExpenseActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        expenses: action.payload.expenses,
        deposits: action.payload.deposits,
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
    case ExpenseActionTypes.REMOVE_COLLECTION_ROW_FAILURE:
    case ExpenseActionTypes.UPDATE_MONTH_FAILURE:
    case ExpenseActionTypes.UPDATE_YEAR_FAILURE:
    case ExpenseActionTypes.UPDATE_TABLE_FAILURE:
    case ExpenseActionTypes.UPDATE_COLLECTIONS_FAILURE:
    case ExpenseActionTypes.FETCH_COLLECTIONS_FAILURE:
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
