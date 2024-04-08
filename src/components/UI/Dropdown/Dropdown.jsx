import React from "react";
import { NavHashLink } from "react-router-hash-link";

const Dropdown = ({ active, children }) => {
  return (
    <div className={classes["dropdown-container"]}>
      <div className={classes["active-box"]}>
        <span className={classes["active"]}>{active}</span>
        <span className={classes["icon"]}>▼</span>
      </div>
      <div className={classes["dropdown-box"]}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
