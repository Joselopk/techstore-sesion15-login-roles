import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import FormularioProvider from "./context/FormularioContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FormularioProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FormularioProvider>
    </AuthProvider>
  </React.StrictMode>
);
