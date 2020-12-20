import { combineReducers } from "redux";

const getExpenses = (state = {}, action) => {
  switch (action.type) {
    case "GET_EXPENSES_SUCCESS":
      return {
        expenses: action.payload,
      };

    case "GET_EXPENSES_FAIL":
      return {
        msg: "No expenses found.",
      };
    default:
      return state;
  }
};

export default combineReducers({
  getExpenses,
});
