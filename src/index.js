import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import quotes from "./quotes";

ReactDOM.render(<App quotes={quotes} />, document.getElementById("root"));
registerServiceWorker();
