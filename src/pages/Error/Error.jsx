import { useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";

import Err404 from "../../assets/images/Error_404.png";
import Err500 from "../../assets/images/Error_500.png";

import classes from "./Error.module.css";
import { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";

const ErrorPage = () => {
  let title = 'An error occured';
  const error = useRouteError();
  const navigate = useNavigate();

  let currentUrl = window.location.pathname + window.location.search;

  console.table(error.status);

  if (error.status === 200) {
    title = 'Internet_Disconnected';
  } else if (error.status === 500) {
    
  } else {
    title = 'Page not found';
  }

  // Only call alert if the condition is met

  return (
    <>
      {error.statusText !== "auth/invalid-credential" ? (
        <div className={classes.box}>
          <div className={classes.img}>
            <img src={error.status === 404 ? Err404 : Err500} alt="" />
          </div>
          <div className={classes.content}>
            <span>{error.status}</span>
            <div className={classes.msg}>
              <h1>{title}</h1>
              <p>
                {error.message}, click <Link to={error.status === 500 ? currentUrl : ".."}>here</Link> to {`${error.status === 500 ? "refresh" : "go back"}`}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorPage;
