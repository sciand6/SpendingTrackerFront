import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";

const reducers = {
  authReducer,
  userReducer,
  expenseReducer,
  form: formReducer,
};

const appReducer = combineReducers(reducers);

export default appReducer;
