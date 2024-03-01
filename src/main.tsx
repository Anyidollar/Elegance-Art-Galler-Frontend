import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { UserProvider } from "./Service/contextApi/UserProvider.tsx";
import { ProductProvider } from "./Service/contextApi/ProductProvider.tsx";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ProductProvider>
          <Router>
            <App />
          </Router>
        </ProductProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
