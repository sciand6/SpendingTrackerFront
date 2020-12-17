import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import userReducer from "./userReducer";

const reducers = {
  authReducer,
  userReducer,
  form: formReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT_SUCCESS") {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
