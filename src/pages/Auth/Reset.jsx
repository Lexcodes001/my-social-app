import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import arrowBack from "../../assets/images/arrow_back.svg";
import classes from "./Auth.module.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { ThemeContext } from "../../context/ThemeContext";
import { AlertContext } from "../../context/AlertContext";
import ThemeToggle from "../../components/UI/Theme/Theme";
import LogoImage from "../../components/UI/Logo/Logo";
import Navigate from "../../components/UI/Navigate/Navigate";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { alertObjState, dispatchAction } = useContext(AlertContext);

  useEffect(() => {
    if (data) {
      if (data[0] === "success") {
        dispatchAction("login_status", "dynamic", "success", "Email Sent!");
        navigate(-1);
      } else if (data[0] === "failed") {
        if (data[1] === "auth/network-request-failed") {
          dispatchAction(
            "internet_status",
            "static",
            "fail",
            "Network error, can't connect!"
          );
          dispatchAction("login_status", "", "", "");
          dispatchAction("register_status", "", "", "");
        } else if (data[1] === "auth/invalid-credential") {
          dispatchAction(
            "login_status",
            "static",
            "fail",
            "Invalid Credentials"
          );
        } else if (data[1] === "auth/too-many-requests") {
          dispatchAction(
            "login_status",
            "dynamic",
            "fail",
            "Too many Invalid requests, try again later"
          );
        } else {
          dispatchAction("login_status", "dynamic", "fail", data[1]);
        }
      }
    } else {
      return;
    }
  }, [data]);

  const handleInputChange = (value) => {
    handleInputValidation(value);
    setEmail(value);
  };

  const handleInputValidation = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = emailRegex.test(value);
    setErr(
      value.length === 0
        ? "Input is empty"
        : testEmail
        ? ""
        : "Please enter a valid email address"
    );
  };

  const isInputValid = () => {
    let isValid = email !== "" && err === "";
    return isValid;
  };

  return (
    <>
      <div className={classes["authWrapper"]}>
        <div className={classes["formWrapper"]}>
          <span className={classes["title"]}>
            <Navigate action="backward" />
            <h1>Reset Password</h1>
          </span>
          <Form method="post" className={classes["form"]}>
            <div className={classes["input-box"]}>
              <label htmlFor="email">Email Address</label>
              <span className={classes["status"]}>
                {err ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      fill="var(--soft-red)"
                      d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                ) : (
                  email && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--green)"
                        d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                      />
                    </svg>
                  )
                )}
              </span>
              <input
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                type="email"
                className={err && classes["inputError"]}
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <span className={classes["err"]}>{err}</span>
            </div>

            <div
              className={`${classes["formBtns"]} ${classes["formBtnsColumn"]}`}
            >
              <button
                type="submit"
                className={`${classes["reset-psw-btn"]}
                  ${isSubmitting || !isInputValid() ? "disabled" : undefined}
                `}
                onClick={() => {
                  !isInputValid() &&
                    dispatchAction(
                      "login_status",
                      "dynamic",
                      "fail",
                      "Input is not a valid email address!"
                    );
                    return;
                }}
              >
                {isSubmitting ? "Sending..." : "Send Password Reset Email"}
              </button>
              <span>
                <p>
                  <Link to="/auth/signup">Sign Up</Link>  |{"  "}
                  <Link to="/auth/login">Sign In</Link>
                </p>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Reset;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");

  try {
    await sendPasswordResetEmail(auth, email);
    return ["success"];
  } catch (error) {
    return ["failed", err.code];
  }
};
