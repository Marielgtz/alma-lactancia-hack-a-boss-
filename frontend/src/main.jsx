import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScrollToTopButton from "./components/ButtonUp";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ScrollToTopButton />
  </React.StrictMode>
);