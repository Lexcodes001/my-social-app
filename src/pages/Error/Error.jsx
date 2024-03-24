import { useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import Err404 from "../../assets/images/Error_404.png";
import Err500 from "../../assets/images/Error_500.png";
import classes from "./Error.module.css";
import { useContext } from "react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  let title = "An error occurred";
  let message = error.message;

  if (error.status === 200 || !isOnline) {
    title = "Network Error, can't connect!";
    message = "Try connecting to a WiFi or cellular network";
  } else if (error.status === 404) {
    title = "Page not found";
  } else {
    title = "An error occurred";
  }

  return (
    <>
      {error.statusText !== "auth/invalid-credential" ? (
        <div className={classes.box}>
          <div className={classes.img}>
            <img src={error.status === 404 ? Err404 : Err500} alt="" />
          </div>
          <div className={classes.content}>
            <span>Error {error.status}</span>
            <div className={classes.msg}>
              <h1>{title}</h1>
              <p>
                {message}. Click <Link to={currentUrl}>here</Link> to {`${error.status === 200 ? "try again" : "refresh"}`}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorPage;