import React, { useContext, useEffect, useState } from "react";
import {
  json,
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./Auth.module.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import Cookies from "universal-cookie";
import visibleSvg from "../../assets/images/visible.svg";
import hiddenSvg from "../../assets/images/hidden.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { AlertContext } from "../../context/AlertContext";
import Navigate from "../../components/UI/Navigate/Navigate";
import { color } from "framer-motion";

const cookies = new Cookies();

const initialErrData = { email: "", psw: "" };

const initialData = { email: "", psw: "" };

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [err, setErr] = useState(initialErrData);
  const [isDisabled, setIsDisabled] = useState(true);
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { alertObjState, dispatchAction } = useContext(AlertContext);

  // const googleLoginHandler = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   cookies.set("auth-token", result.user.refreshToken);
  //   navigate("/");
  // };

  useEffect(() => {
    console.log('Execute!')
    if (data) {
      if (data[0] === "success") {
        dispatchAction(
          "login_status",
          "dynamic",
          "success",
          "Successfully Logged In"
        );

        navigate("/");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInputValid()) {
      const { email, psw } = formData;

      try {
        await signInWithEmailAndPassword(auth, email, psw);

        dispatchAction(
          "login_status",
          "dynamic",
          "success",
          "Successfully Logged In"
        );

        navigate("/");
      } catch (err) {
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
      }
    } else {
      dispatchAction(
        "login_status",
        "dynamic",
        "fail",
        "Enter your credentials to sign in"
      );
    }
  };

  const handleInputChange = (field, value) => {
    handleInputValidation(field, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleInputValidation = (field, value) => {
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = emailRegex.test(value);
      setErr((prev) => ({
        ...prev,
        [field]:
          value.length === 0
            ? "Input is empty"
            : testEmail
            ? ""
            : "Please enter a valid email address",
      }));
    } else if (field === "psw") {
      setErr((prev) => ({
        ...prev,
        [field]: value.length === 0 ? "Input is empty" : "",
      }));
    } else {
      return;
    }
  };

  const isInputValid = () => {
    let requiredFields = Object.keys(formData).filter(
      (field) => formData[field].trim() === ""
    );

    let currentErrors = Object.keys(err).filter(
      (field) => err[field].trim() !== ""
    );
    // console.log(requiredFields.length === 0 && currentErrors.length === 0);
    return requiredFields.length === 0 && currentErrors.length === 0;
  };

  return (
    <div className={classes["authWrapper"]}>
      <div className={classes["formWrapper"]}>
        <span className={classes["title"]}>
          <Navigate action="backward" />
          <h1>Sign In</h1>
        </span>
        <Form method="post" className={classes["form"]}>
          <div className={classes["input-box"]}>
            <label htmlFor="email">Email Address</label>
            <span className={classes["status"]}>
              {err.email ? (
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
                formData.email && (
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
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              type="email"
              className={err.email && classes["inputError"]}
              id="email"
              name="email"
              placeholder=""
            />
            <span className={classes["err"]}>{err.email}</span>
          </div>
          <div className={classes["input-box"]}>
            <label
              style={{ color: err.psw && "var(--soft-red)" }}
              htmlFor="psw"
            >
              Password
            </label>
            <span className={classes["status"]}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVisible((prev) => {
                    return !prev;
                  });
                }}
              >
                <img src={!visible ? visibleSvg : hiddenSvg} alt="" />
              </button>

              {err.psw ? (
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
                formData.psw && (
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
              value={formData.psw}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              type={visible ? "text" : "password"}
              className={err.psw && classes["inputError"]}
              id="psw"
              name="psw"
              placeholder=""
            />
            <div className={classes["login-psw"]}>
              <span className={classes["err"]}>{err.psw}</span>
              <p className={classes["reset"]}>
                <Link to="/auth/login/reset">Forgot Password?</Link>
              </p>
            </div>
          </div>

          {/* {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )} */}

          <div
            className={`${classes["formBtns"]} ${classes["formBtnsColumn"]}`}
          >
            <button
              type="submit"
              className={
                isSubmitting || !isInputValid() ? "disabled" : undefined
              }
              // disabled={isSubmitting || !isInputValid()}
            >
              {isSubmitting ? "Checking..." : "Sign In"}
            </button>
            <span>
              <p>
                Not a member? <Link to="/auth/signup">Sign Up</Link>
              </p>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

export const action = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("psw"),
  };

  const { email, password } = authData;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    return [
      "success",
    ];
  } catch (err) {
    console.table(err);
    if (err.code === "auth/network-request-failed") {
      return ["failed", err.code];
    } else if (err.code === "auth/invalid-credential") {
      return ["failed", err.code];
    } else if (err.code === "auth/too-many-requests") {
      return ["failed", err.code];
    } else {
      return ["failed", err.code];
    }
  }
};
