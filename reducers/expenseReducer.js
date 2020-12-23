import { combineReducers } from "redux";

const getExpenses = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_EXPENSE_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case "CREATE_EXPENSE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case "CREATE_EXPENSE_FAIL":
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
        expenses: action.payload,
      };
    case "GET_EXPENSES_FAIL":
    case "USER_LOGOUT_SUCCESS":
      return {
        ...state,
        expenses: [],
      };
    default:
      return state;
  }
};

export default combineReducers({
  getExpenses,
});
