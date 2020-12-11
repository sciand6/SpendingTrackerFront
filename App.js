import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persist from "./config/store";
import Main from "./Main";

export default function App() {
  return (
    <Provider store={persist().store}>
      <PersistGate loading={null} persistor={persist().persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
