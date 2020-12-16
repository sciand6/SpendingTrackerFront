import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";

const reducers = {
  authReducer,
  userReducer,
  form: formReducer,
};

export default combineReducers(reducers);
