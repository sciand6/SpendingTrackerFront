import { combineReducers } from "redux";

const createUser = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: false,
      };

    case "CREATE_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        isLoggedIn: true,
      };

    case "CREATE_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        isLoggedIn: false,
      };

    case "USER_LOGOUT_SUCCESS":
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

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
        isLoggedIn: false,
      };

    case "LOGIN_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
        isLoggedIn: true,
      };

    case "LOGIN_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default combineReducers({
  createUser,
  loginUser,
});
