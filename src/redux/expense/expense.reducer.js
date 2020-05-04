import ExpenseActionTypes from './expense.types';

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
        data: [...state.data, {label: '', paid: 0, date: ''}],
      };
    case ExpenseActionTypes.REMOVE_ITEM:
      return {
        ...state,
        data: state.data.filter((item, index) => index !== action.payload.index),
      };
    case ExpenseActionTypes.UPDATE_ITEM:
      return {
        ...state,
        data: state.data.map((item, index) => {
          // Find the item with the matching id
          if(index === action.payload.index) {
            // Return a new object
            return {
              ...item,  // copy the existing item
              [action.payload.label]: action.payload.paid  // replace the email addr
            }
          }

          // Leave every other item unchanged
          return item;
        }),
      };
    case ExpenseActionTypes.REMOVE_ITEM_START:
    case ExpenseActionTypes.UPDATE_MONTH_START:
    case ExpenseActionTypes.UPDATE_YEAR_START:
    case ExpenseActionTypes.UPDATE_TABLE_START:
    case ExpenseActionTypes.UPDATE_ITEM_START:
      return {
        ...state,
        isUpdating: true,
      };
    case ExpenseActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ExpenseActionTypes.REMOVE_ITEM_SUCCESS:
    case ExpenseActionTypes.UPDATE_ITEM_SUCCESS:
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
    case ExpenseActionTypes.REMOVE_ITEM_FAILURE:
    case ExpenseActionTypes.UPDATE_MONTH_FAILURE:
    case ExpenseActionTypes.UPDATE_YEAR_FAILURE:
    case ExpenseActionTypes.UPDATE_TABLE_FAILURE:
    case ExpenseActionTypes.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        isUpdating: false,
        errorMessage: action.payload,
      };
    case ExpenseActionTypes.FETCH_YEARS_FAILURE:
    case ExpenseActionTypes.FETCH_MONTHS_FAILURE:
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
