import { createContext, useEffect, useState, useReducer } from "react";

export const AlertContext = createContext();

import { useOnlineStatus } from "../hooks/useOnlineStatus";

const defAlertObj = {
  internet_status: {
    mode: "",
    text: "",
    type: "",
    isDisp: false,
  },
  login_status: {
    mode: "",
    text: "",
    type: "",
    isDisp: false,
  },
  register_status: {
    mode: "",
    text: "",
    type: "",
    isDisp: false,
  },
};

let updatedState, alertObj;

const alertObjStateReducer = (state, action) => {
  alertObj = {
    mode: action.mode,
    text: action.text,
    isDisp: action.isDisp,
  };
  updatedState = {...state};
  updatedState[action.type] = alertObj;
  return {...updatedState};

  // if (action.type === "internet_status") {
  // }
};

export const AlertContextProvider = ({ children }) => {
  const isOnline = useOnlineStatus();
  const [isFirst, setIsFirst] = useState(true);

  const [alertObjState, dispatchAlertObjState] = useReducer(
    alertObjStateReducer,
    defAlertObj
  );

  const dispatchAction = (type, mood, mode, text) => {
    if (mood === "static") {
      dispatchAlertObjState({
        type: type,
        mode: mode,
        text: text,
        isDisp: true,
      });
    } else if (mood === "dynamic") {
      dispatchAlertObjState({
        type: type,
        mode: mode,
        text: text,
        isDisp: true,
      });
      setTimeout(() => {
        dispatchAlertObjState({
          type: type,
          mode: "",
          text: "",
          isDisp: false,
        });
      }, 5000);
    } else {
      dispatchAlertObjState({
        type: type,
        mode: mode,
        text: text,
        isDisp: false,
      });
    }
  };

  useEffect(() => {
    if (isOnline === false) {
      dispatchAction(
        "internet_status",
        "static",
        "fail",
        "Connection has been lost!"
      );
    } else if (isOnline === null) {
      dispatchAction("internet_status", "close", "", "");
    } else {
      isFirst && setIsFirst(false);
      !isFirst && dispatchAction(
        "internet_status",
        "dynamic",
        "success",
        "You're back online!"
      );
    }
  }, [isOnline]);

  return (
    <AlertContext.Provider value={{ alertObjState, dispatchAction }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
