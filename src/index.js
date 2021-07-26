import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LocalDBProvider from "./context/LocalDB";
import AlertMSG from "./alert";

ReactDOM.render(
  <LocalDBProvider>
    <AlertMSG />
    <App />
  </LocalDBProvider>,
  document.getElementById("root")
);
