import { combineReducers } from "redux";

const initialState = {
  expenses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errors: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EXPENSE_LOADING":
    case "DELETE_EXPENSE_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case "CREATE_EXPENSE_SUCCESS":
    case "DELETE_EXPENSE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case "CREATE_EXPENSE_FAIL":
    case "DELETE_EXPENSE_FAIL":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    case "GET_EXPENSES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        expenses: action.payload,
      };
    case "GET_EXPENSES_FAIL":
    case "USER_LOGOUT_SUCCESS":
      return {
        expenses: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  expenseReducer,
});
