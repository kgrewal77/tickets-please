import "@fontsource/inter";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
