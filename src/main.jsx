import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { AlertContextProvider } from "./context/AlertContext.jsx";
import AlertBoxPortal from "./components/UI/AlertBox/AlertBoxPortal.jsx";
// import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AlertContextProvider>
        <AuthContextProvider>
          <App />
          <AlertBoxPortal />
        </AuthContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
