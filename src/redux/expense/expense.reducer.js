import ExpenseActionTypes from './expense.types';
import { updateAmount, months, years, tables } from './expense.utils';

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
  isUpdating: false,
  errorMessage: undefined,
};

const expenseReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ExpenseActionTypes.ADD_EXPENSE: 
      return {
        ...state,
        expenses: [...state.expenses, {name: '', value: 0, date: ''}],
      };
    case ExpenseActionTypes.REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense, expenseIndex) => action.payload.index !== expenseIndex
        ),
      };
    case ExpenseActionTypes.UPDATE_MONTH:
      return {
        ...state,
        selectedMonth: action.payload.option,
      };
    case ExpenseActionTypes.UPDATE_YEAR:
      return {
        ...state,
        selectedYear: action.payload.option,
      };
    case ExpenseActionTypes.UPDATE_TABLE:
      return {
        ...state,
        selectedTable: action.payload.option,
      };
    case ExpenseActionTypes.UPDATE_COLLECTIONS_START:
      return {
        ...state,
        isUpdating: true,
      };
    case ExpenseActionTypes.UPDATE_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        expenses: action.payload.expenses,
        deposits: action.payload.deposits,
      };
    case ExpenseActionTypes.UPDATE_COLLECTIONS_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errorMessage: action.payload,
      };
    case ExpenseActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ExpenseActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        expenses: action.payload.expenses,
        deposits: action.payload.deposits,
      };
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
