import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeContextProvider } from "./context/ThemeContext";
import { AlertContextProvider } from "./context/AlertContext.jsx";
import AlertBoxPortal from "./components/UI/AlertBox/AlertBoxPortal.jsx";
import Popup from "./components/UI/SettingsPopup/Popup.jsx";
// import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AlertContextProvider>
        <App />
        <AlertBoxPortal />
      </AlertContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
