// main.jsx (or index.jsx)
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./Redux";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        {/* No <BrowserRouter> here, because App already uses RouterProvider */}
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
