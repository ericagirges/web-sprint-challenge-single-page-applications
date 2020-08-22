import React from "react";
import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";


render(
    <Router>
      <App />
    </Router>
    , document.querySelector('#root')
  )
