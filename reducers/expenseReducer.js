import { combineReducers } from "redux";

const getExpenses = (state = {}, action) => {
  switch (action.type) {
    case "GET_EXPENSES_SUCCESS":
      return {
        expenses: action.payload,
        msg: "fetch successful",
      };

    case "GET_EXPENSES_FAIL":
      return {
        expenses: [],
        msg: "fetch failed",
      };
    default:
      return state;
  }
};

export default combineReducers({
  getExpenses,
});
