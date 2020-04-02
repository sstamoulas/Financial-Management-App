import ExpenseActionTypes from './expense.types';
import { updateExpense, months, years, tables } from './expense.utils';

const INITIAL_STATE = {
  overviewExpenses: [],
  overviewDeposits: [],
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
        overviewExpenses: [...state.overviewExpenses, {name: '', value: 0, date: ''}],
      };
    case ExpenseActionTypes.REMOVE_EXPENSE:
      return {
        ...state,
        overviewExpenses: state.overviewExpenses.filter(
          (expense, expenseIndex) => action.payload.index !== expenseIndex
        ),
      };
    case ExpenseActionTypes.UPDATE_EXPENSE:
      return {
        ...state,
        overviewExpenses: updateExpense(state.overviewExpenses, action.payload),
      };
    case ExpenseActionTypes.UPDATE_DEPOSIT:
      return {
        ...state,
        overviewDeposits: updateExpense(state.overviewDeposits, action.payload),
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
    case ExpenseActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ExpenseActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        overviewExpenses: action.payload.expenses,
        overviewDeposits: action.payload.deposits,
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
