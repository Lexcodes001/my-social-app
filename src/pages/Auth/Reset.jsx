import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import arrowBack from "../../assets/images/arrow_back.svg";
import classes from "./Auth.module.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { ThemeContext } from "../../context/ThemeContext";
import { AlertContext } from "../../context/AlertContext";
import ThemeToggle from "../../components/UI/Theme/Theme";
import LogoImage from "../../components/UI/Logo/Logo";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { alertObjState, dispatchAction } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        dispatchAction("login_status", "dynamic", "success", "Email Sent!");
        navigate("/auth/login");
      })
      .catch((err) => {
        if (err.code === "auth/network-request-failed") {
          dispatchAction(
            "internet_status",
            "static",
            "fail",
            "Network error, can't connect!"
          );
          dispatchAction("login_status", "", "", "");
          dispatchAction("register_status", "", "", "");
        } else if (err.code === "auth/invalid-credential") {
          dispatchAction(
            "login_status",
            "static",
            "fail",
            "Invalid Credentials"
          );
        } else if (err.code === "auth/too-many-requests") {
          dispatchAction(
            "login_status",
            "dynamic",
            "fail",
            "Too many Invalid requests, try again later"
          );
        } else {
          dispatchAction("login_status", "dynamic", "fail", err.code);
        }
      });
  };

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
    console.log(isValid);
    return isValid;
  };

  return (
    <>
      <div className={classes["authWrapper"]}>
        <div className={classes["formWrapper"]}>
          <span className={classes["title"]}>
            <button onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  fill="var(--txt-two)"
                  d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z"
                />
              </svg>
            </button>
            <h1>Reset Password</h1>
          </span>
          <form
            onSubmit={handleSubmit}
            method="post"
            className={classes["form"]}
          >
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
                disabled={isSubmitting || !isInputValid()}
              >
                {isSubmitting ? "Checking..." : "Send Password Reset Email"}
              </button>
              <span>
                <p>
                  <Link to="/auth/signup">Sign Up</Link> |{" "}
                  <Link to="/auth/login">Sign In</Link>
                </p>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
