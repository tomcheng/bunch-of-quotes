import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import shuffle from "lodash/shuffle";
import registerServiceWorker from "./registerServiceWorker";
import quotes from "./quotes";

const shuffledQuotes = shuffle(quotes);

ReactDOM.render(<App quotes={shuffledQuotes} />, document.getElementById("root"));

registerServiceWorker();
