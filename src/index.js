import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import shuffle from "lodash/shuffle";
import registerServiceWorker from "./registerServiceWorker";
import quotes from "./quotes";

const shuffledQuotes = shuffle(quotes);
let index = 0;

const getQuote = () => shuffledQuotes[index++];

ReactDOM.render(<App getQuote={getQuote} />, document.getElementById("root"));

registerServiceWorker();
