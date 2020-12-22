import { combineReducers } from "redux";

const authData = (state = {}, action) => {
  switch (action.type) {
    case "AUTH_USER_SUCCESS":
      return {
        isLoggedIn: true,
        token: action.token,
      };

    case "AUTH_USER_FAIL":
    case "CREATE_USER_FAIL":
    case "USER_LOGOUT_SUCCESS":
    case "LOGIN_USER_FAIL":
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const createUser = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case "CREATE_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case "CREATE_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    case "USER_LOGOUT_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    default:
      return state;
  }
};

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };

    case "LOGIN_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };

    case "LOGIN_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };

    case "USER_LOGOUT_SUCCESS":
      return {
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
  createUser,
  loginUser,
  authData,
});
