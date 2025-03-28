import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";
import "@fontsource/inter";
import { store } from "./store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Helmet>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Helmet>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
