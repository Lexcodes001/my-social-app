import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import AlertBox from './AlertBox'; 
import { AlertContext } from '../../../context/AlertContext';

const AlertBoxPortal = () => {
  const { alertObjState, dispatchAction } = useContext(AlertContext);
  const alertArr = Object.values(alertObjState);
  const filteredArr = alertArr.filter((elem) => elem.isDisp === true);

  return createPortal(
    <AlertBox arr={alertArr} filteredArr={filteredArr} />,
    document.body
  );
};

export default AlertBoxPortal;
