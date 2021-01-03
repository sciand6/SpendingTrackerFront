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
        isLoading: false,
        isError: false,
        isSuccess: false,
        errors: false,
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
