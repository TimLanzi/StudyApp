/*
  This file is used to render our entire application inside our "Frame" and
  does so inside of a browser router inorder to allow routing through the DOM
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Frame from "./components/Frame";
import Login from "./components/Main/Login";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Frame />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
