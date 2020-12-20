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

      if (response.success && response.responseBody.expenses.length !== 0) {
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
