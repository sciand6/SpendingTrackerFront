import { fetchApi } from "../service/api";

export const createNewUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_USER_LOADING",
      });
      const response = await fetchApi("/auth/signup", "POST", payload, 200);

      if (response.success) {
        dispatch({
          type: "CREATE_USER_SUCCESS",
        });
        dispatch({
          type: "AUTH_USER_SUCCESS",
          token: response.token,
        });
        dispatch({
          type: "GET_USER_SUCCESS",
          payload: response.responseBody,
        });

        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: "CREATE_USER_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};

export const userLogin = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "LOGIN_USER_LOADING",
      });
      const response = await fetchApi("/auth/login", "POST", payload, 200);

      if (response.success) {
        dispatch({
          type: "LOGIN_USER_SUCCESS",
        });
        dispatch({
          type: "AUTH_USER_SUCCESS",
          token: response.token,
        });
        dispatch({
          type: "GET_USER_SUCCESS",
          payload: response.responseBody,
        });

        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_USER_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};

export const logoutUser = () => {
  return {
    type: "USER_LOGOUT_SUCCESS",
  };
};
