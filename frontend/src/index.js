/*
  This file is used to render our entire application inside our "Frame" and
  does so inside of a browser router inorder to allow routing through the DOM
*/

import React from "react";
import ReactDOM from "react-dom";
import App from './App';

ReactDOM.render(<App />, document.getElementById("root"));
