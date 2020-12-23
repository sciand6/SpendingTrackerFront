import { fetchApi } from "../service/api";

export const getExpenses = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetchApi(
        "/expenses/getExpenses",
        "GET",
        null,
        200,
        payload
      );

      if (response.success) {
        dispatch({
          type: "GET_EXPENSES_SUCCESS",
          payload: response.responseBody,
        });

        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: "GET_EXPENSES_FAIL",
      });
      return error;
    }
  };
};

export const createExpense = (payload, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_EXPENSE_LOADING",
      });

      const response = await fetchApi(
        "/expenses/createExpense",
        "POST",
        payload,
        200,
        token
      );

      if (response.success) {
        dispatch({
          type: "CREATE_EXPENSE_SUCCESS",
        });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: "CREATE_EXPENSE_FAIL",
        payload: error.responseBody,
      });
      return error;
    }
  };
};
