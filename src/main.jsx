import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NotesApp } from "./NotesApp";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotesApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
