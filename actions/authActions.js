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
          token: response.responseBody.token,
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
          token: response.responseBody.token,
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

export const changePassword = (payload, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CHANGE_PASSWORD_LOADING",
      });

      const response = await fetchApi(
        "/auth/resetPassword",
        "PUT",
        payload,
        200,
        token
      );

      if (response.success) {
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS" });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: "CHANGE_PASSWORD_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: "USER_LOGOUT_SUCCESS",
    });
  };
};
