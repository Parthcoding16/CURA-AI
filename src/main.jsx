/**
 * Entry point
 * -----------
 * Mounts the React app into <div id="root"> in index.html. BrowserRouter gives
 * clean URLs like /ai-doctor; vercel.json makes those URLs work on refresh.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
