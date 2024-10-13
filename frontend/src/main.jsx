import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScrollToTopButton from "./components/ButtonUp";
import { ToastContainer, toast } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
    <ScrollToTopButton />
  </React.StrictMode>
);
