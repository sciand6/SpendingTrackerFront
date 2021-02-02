import { combineReducers } from "redux";

const initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER_LOADING":
    case "LOGIN_USER_LOADING":
      return {
        token: action.token,
        isLoggedIn: false,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case "CHANGE_PASSWORD_LOADING":
    case "DELETE_ACCOUNT_LOADING":
    case "FORGOT_PASSWORD_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case "CHANGE_PASSWORD_FAIL":
    case "DELETE_ACCOUNT_FAIL":
    case "FORGOT_PASSWORD_FAIL":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    case "CREATE_USER_SUCCESS":
    case "LOGIN_USER_SUCCESS":
      return {
        token: action.token,
        isLoggedIn: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case "CREATE_USER_FAIL":
    case "LOGIN_USER_FAIL":
      return {
        token: null,
        isLoggedIn: false,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    case "USER_LOGOUT_SUCCESS":
    case "DELETE_ACCOUNT_SUCCESS":
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        token: null,
        isLoggedIn: false,
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
  authReducer,
});
