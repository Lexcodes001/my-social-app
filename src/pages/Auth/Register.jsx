import React, { useContext, useState, useEffect } from "react";
import classes from "./Auth.module.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  json,
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import AddIcon from "../../assets/images/addAvatar.png";
import visibleSvg from "../../assets/images/visible.svg";
import hiddenSvg from "../../assets/images/hidden.svg";
import review from "../../assets/images/review.png";
import { PrivacyPolicy, TermsOfService } from "../../components/Terms/Terms";
import { ThemeContext } from "../../context/ThemeContext";
import { AlertContext } from "../../context/AlertContext";
import ThemeToggle from "../../components/UI/Theme/Theme";
import LogoImage from "../../components/UI/Logo/Logo";
import Navigate from "../../components/UI/Navigate/Navigate";

const initialErrData = {
  step1: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    psw: "",
    gender: "",
    dob: "",
  },
  step2: { username: "" },
};

const initialData = {
  step1: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    psw: "",
    gender: "",
    dob: "",
    address: "",
    bio: "",
  },
  step2: { username: "", file: null },
  step3: { termsCheck: "" },
  step4: { confirmCheck: "" },
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState({
    step1: "pending",
    step2: "pending",
    step3: "pending",
    step4: "pending",
  });
  const [isStepValid, setIsStepValid] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [err, setErr] = useState(initialErrData);
  const [loading, setLoading] = useState(false);
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { alertObjState, dispatchAction } = useContext(AlertContext);

  useEffect(() => {
    let currentStep = step - 1;
    const currentStepData = formData[`step${step}`];
    if (step === 1) {
      const currentErrState = err[`step${step}`];
      let requiredFields = Object.keys(currentStepData).filter(
        (field) => currentStepData[field].trim() === ""
      );

      let currentErrors = Object.keys(currentErrState).filter(
        (field) => currentErrState[field].trim() !== ""
      );

      let result = requiredFields.length === 0 && currentErrors.length === 0;
      setSteps((prev) => ({
        ...prev,
        [`step${step}`]: `${result ? "completed" : "pending"}`,
      }));
      setIsStepValid(result);
    } else if (step === 2) {
      const currentErrState = err[`step${step}`];
      let requiredField = currentStepData["username"].trim() !== "";

      let currentError = currentErrState["username"].trim() === "";

      let result = requiredField && currentError;
      setSteps((prev) => ({
        ...prev,
        [`step${step}`]: `${result ? "completed" : "pending"}`,
      }));
      setIsStepValid(result);
    } else if (step === 3) {
      let result = currentStepData.termsCheck === "checked";
      setSteps((prev) => ({
        ...prev,
        [`step${step}`]: `${result ? "completed" : "pending"}`,
      }));
      setIsStepValid(result);
    } else if (step === 4) {
      let result = currentStepData.confirmCheck === "checked";
      setSteps((prev) => ({
        ...prev,
        [`step${step}`]: `${result ? "completed" : "pending"}`,
      }));
      setIsStepValid(result);
    } else {
      setIsStepValid((prev) => ({ ...prev }));
    }
  }, [step, formData]);

  useEffect(() => {
    if (data) {
      if (data[0] === "success") {
        dispatchAction(
          "register_status",
          "dynamic",
          "success",
          "User registered successfully!"
        );

        dispatchAction("login_status", "dynamic", "success", "Logging In...");
        sendEmailVerification(auth.currentUser).then(() => {
          dispatchAction(
            "register_status",
            "dynamic",
            "success",
            `A verification mail has been sent to ${formData.step1.email}, ensure you verify your email address for this account`
          );
        });

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
        } else if (data[1] === "auth/too-many-requests") {
          dispatchAction(
            "register_status",
            "dynamic",
            "fail",
            "Too many Invalid requests, try again later"
          );
        } else {
          dispatchAction("register_status", "dynamic", "fail", data[1]);
        }
      }
    } else {
      return;
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isStepValid) {
      const {
        firstName,
        middleName,
        lastName,
        email,
        psw,
        gender,
        dob,
        address,
        bio,
      } = formData.step1;

      const { username, file } = formData.step2;
      console.log(e.target);

      try {
        // Create user
        const res = await createUserWithEmailAndPassword(auth, email, psw);

        // Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${username + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            // Update profile
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // Create user on firestore
            await setDoc(
              doc(
                db,
                `${middleName.toLowerCase() !== "admin" ? "users" : "admins"}`,
                res.user.uid
              ),
              {
                uid: res.user.uid,
                firstName,
                middleName,
                lastName,
                username,
                email,
                gender,
                dob,
                address,
                bio,
                followers: [],
                following: [],
                posts: [],
                personalChats: [],
                groups: [],
                listings: [],
                photoURL: downloadURL,
                createdAt: serverTimestamp(),
              }
            );

            // Create empty user chats on firestore
            await setDoc(doc(db, "personalChats", res.user.uid), []);
            await setDoc(doc(db, "personalPosts", res.user.uid), []);
            await setDoc(doc(db, "listings", res.user.uid), []);

            dispatchAction(
              "register_status",
              "dynamic",
              "success",
              "User registered successfully!"
            );

            dispatchAction(
              "login_status",
              "dynamic",
              "success",
              "Logging In..."
            );
            // sendEmailVerification(auth.currentUser).then(() => {
            // });

            navigate("/");
          });
        });
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
        } else if (err.code === "auth/too-many-requests") {
          dispatchAction(
            "register_status",
            "dynamic",
            "fail",
            "Too many Invalid requests, try again later"
          );
        } else {
          dispatchAction("register_status", "dynamic", "fail", err.code);
        }
      }
    } else {
      dispatchAction(
        "register_status",
        "dynamic",
        "fail",
        "Complete all required fields"
      );
    }
  };

  const handleInputValidation = (inputName, inputValue) => {
    let currentStep = step - 1;
    if (
      inputName === "firstName" ||
      inputName === "middleName" ||
      inputName === "lastName"
    ) {
      const nameRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)?$/;
      const testName = nameRegex.test(inputValue);

      setErr((prev) => ({
        ...prev,
        [`step${step}`]: {
          ...prev[`step${step}`],
          [inputName]:
            inputValue.length === 0
              ? "Input is empty"
              : testName
              ? ""
              : "Input should not have any space or special character",
        },
      }));
    } else if (inputName === "username") {
      const userNameRegex = /^[a-zA-Z0-9_]+$/;
      const testUserName = userNameRegex.test(inputValue);

      setErr((prev) => ({
        ...prev,
        [`step${step}`]: {
          ...prev[`step${step}`],
          [inputName]:
            inputValue.length === 0
              ? "Input is empty"
              : testUserName
              ? ""
              : "Input contains invalid characters",
        },
      }));
    } else if (inputName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = emailRegex.test(inputValue);
      setErr((prev) => ({
        ...prev,
        [`step${step}`]: {
          ...prev[`step${step}`],
          [inputName]:
            inputValue.length === 0
              ? "Input is empty"
              : testEmail
              ? ""
              : "Please enter a valid email address",
        },
      }));
    } else if (inputName === "psw") {
      const criteria = {
          lowercase: /(?=.*[a-z])/.test(inputValue),
          uppercase: /(?=.*[A-Z])/.test(inputValue),
          digit: /(?=.*\d)/.test(inputValue),
          "special character": /(?=.*[@$!%*?&])/.test(inputValue),
        },
        length = /^[A-Za-z\d@$!%*?&]{8,}$/.test(inputValue);

      const failedCriteria = Object.keys(criteria).filter(
        (key) => !criteria[key]
      );

      let isValid = failedCriteria.length === 0;

      setErr((prev) => ({
        ...prev,
        [`step${step}`]: {
          ...prev[`step${step}`],
          [inputName]:
            inputValue.length === 0
              ? "Input is empty"
              : isValid
              ? ""
              : `Password does not contain a ${failedCriteria.join(", ")} ${
                  !length && "and not long enough"
                }`,
        },
      }));
    } else if (inputName === "dob") {
      let inputDate = new Date(inputValue);
      let isValid =
        !isNaN(inputDate) &&
        inputDate.getFullYear() >= 1924 &&
        inputDate.getFullYear() <= 2014;
      setErr((prev) => ({
        ...prev,
        [`step${step}`]: {
          ...prev[`step${step}`],
          [inputName]: isValid ? "" : "You are not eligible to register",
        },
      }));
    } else {
      return;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`step${step}`]: {
        ...prevFormData[`step${step}`],
        [field]: value,
      },
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();

    switch (e.target.name) {
      case "firstName":
      case "middleName":
      case "lastName":
      case "email":
      case "psw":
      case "dob":
      case "username":
      case "address":
      case "bio":
      case "gender":
      case "confirmCheck":
      case "termsCheck":
        handleInputValidation(e.target.name, e.target.value);
        handleInputChange(e.target.name, e.target.value);
        break;
      case "file":
        handleInputChange(e.target.name, e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        break;

      default:
        break;
    }
  };

  return (
    <div className={classes["authWrapper"]}>
      <div className={classes["formWrapper"]}>
        <span className={classes["title"]}>
          <Navigate action="backward" />
          <h1>Sign Up</h1>
        </span>
        <div className={classes["navigationWrapper"]}>
          <button
            id="1"
            className={step === 1 ? classes["active"] : undefined}
            onClick={() => {
              setStep(1);
            }}
            disabled={isSubmitting || steps.step1 === "pending"}
          >
            <span>
              {steps.step1 === "pending" ? (
                "1"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    fill="var(--surface-1)"
                    d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                  />
                </svg>
              )}
            </span>
            <p>Basic Info.</p>
          </button>
          <button
            id="2"
            className={step === 2 ? classes["active"] : undefined}
            onClick={() => {
              setStep(2);
            }}
            disabled={isSubmitting || steps.step1 === "pending"}
          >
            <span>
              {steps.step2 === "pending" ? (
                "2"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    fill="var(--surface-1)"
                    d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                  />
                </svg>
              )}
            </span>
            <p>Profile Info.</p>
          </button>
          <button
            id="3"
            className={step === 3 ? classes["active"] : undefined}
            onClick={() => {
              setStep(3);
            }}
            disabled={isSubmitting || steps.step2 === "pending"}
          >
            <span>
              {steps.step3 === "pending" ? (
                "3"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    fill="var(--surface-1)"
                    d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                  />
                </svg>
              )}
            </span>
            <p>TnC</p>
          </button>
          <button
            id="4"
            className={step === 4 ? classes["active"] : undefined}
            onClick={() => {
              setStep(4);
            }}
            disabled={isSubmitting || steps.step3 === "pending"}
          >
            <span>
              {steps.step4 === "pending" ? (
                "4"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    fill="var(--surface-1)"
                    d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                  />
                </svg>
              )}
            </span>
            <p>Final Check</p>
          </button>
        </div>
        <form onSubmit={handleSubmit} method="post">
          <section
            className={classes["form-section"]}
            style={{ display: step === 1 ? "flex" : "none" }}
          >
            <header>
              <span>Step {step}/4</span>
              <h2>Basic Information</h2>
            </header>
            <main>
              <div className={classes["input-box"]}>
                <label htmlFor="firstName">First Name</label>
                <span className={classes["status"]}>
                  {err.step1.firstName ? (
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
                    formData.step1.firstName && (
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
                  className={
                    err.step1.firstName ? classes["inputError"] : undefined
                  }
                  value={formData.step1.firstName}
                  onChange={handleChange}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder=""
                />
                <span className={classes["err"]}>{err.step1.firstName}</span>
              </div>

              <div className={classes["input-box"]}>
                <label htmlFor="middleName">Middle Name</label>
                <span className={classes["status"]}>
                  {err.step1.middleName ? (
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
                    formData.step1.middleName && (
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
                  className={
                    err.step1.middleName ? classes["inputError"] : undefined
                  }
                  value={formData.step1.middleName}
                  onChange={handleChange}
                  type="text"
                  id="middleName"
                  name="middleName"
                  placeholder=""
                />
                <span className={classes["err"]}>{err.step1.middleName}</span>
              </div>

              <div className={classes["input-box"]}>
                <label htmlFor="lastName">Last Name</label>
                <span className={classes["status"]}>
                  {err.step1.lastName ? (
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
                    formData.step1.lastName && (
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
                  className={
                    err.step1.lastName ? classes["inputError"] : undefined
                  }
                  value={formData.step1.lastName}
                  onChange={handleChange}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder=""
                />
                <span className={classes["err"]}>{err.step1.lastName}</span>
              </div>
              <div className={classes["input-box"]}>
                <label htmlFor="email">Email Address</label>
                <span className={classes["status"]}>
                  {err.step1.email ? (
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
                    formData.step1.email && (
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
                  className={
                    err.step1.email ? classes["inputError"] : undefined
                  }
                  value={formData.step1.email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                />
                <span className={classes["err"]}>{err.step1.email}</span>
              </div>
              <div className={classes["input-box"]}>
                <label htmlFor="psw">Password</label>
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

                  {err.step1.psw ? (
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
                    formData.step1.psw && (
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
                  className={err.step1.psw ? classes["inputError"] : undefined}
                  value={formData.step1.psw}
                  onChange={handleChange}
                  type={visible ? "text" : "password"}
                  id="psw"
                  name="psw"
                  placeholder=""
                />
                <span className={classes["err"]}>{err.step1.psw}</span>
              </div>
              <div className={classes["input-box"]}>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  className={err.step1.dob ? classes["inputError"] : undefined}
                  value={formData.step1.dob}
                  onChange={handleChange}
                  type="date"
                  id="dob"
                  name="dob"
                  min="1924-01-01"
                  max="2014-12-31"
                />
                <span className={classes["err"]}>{err.step1.dob}</span>
              </div>
              <div className={classes["input-box"]}>
                <label htmlFor="address">Address</label>
                <textarea
                  value={formData.step1.address}
                  onChange={handleChange}
                  id="address"
                  name="address"
                  placeholder=""
                ></textarea>
              </div>

              <div className={classes["input-box"]}>
                <label htmlFor="bio">Write about yourself...</label>
                <textarea
                  value={formData.step1.bio}
                  onChange={handleChange}
                  id="bio"
                  name="bio"
                  placeholder=""
                ></textarea>
              </div>

              <div className={`${classes["gender-box"]}`}>
                <label htmlFor="gender">Gender</label>
                <div className={classes["radio-boxes"]}>
                  <div
                    className={`${classes["radio-box"]} ${
                      formData.step1.gender === "male"
                        ? classes.active
                        : undefined
                    }`}
                  >
                    <label htmlFor="male">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path
                          fill={
                            formData.step1.gender === "male"
                              ? "var(--surface-1)"
                              : "var(--text-1)"
                          }
                          d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z"
                        />
                      </svg>
                      <p>Male</p>
                    </label>
                    <input
                      className={
                        err.step1.gender ? classes["inputError"] : undefined
                      }
                      onClick={handleChange}
                      onChange={handleChange}
                      id="male"
                      type="radio"
                      value="male"
                      name="gender"
                      checked={formData.step1.gender === "male"}
                    />
                  </div>
                  <div
                    className={`${classes["radio-box"]} ${
                      formData.step1.gender === "female"
                        ? classes.active
                        : undefined
                    }`}
                  >
                    <label htmlFor="female">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path
                          fill={
                            formData.step1.gender === "female"
                              ? "var(--surface-1)"
                              : "var(--text-1)"
                          }
                          d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z"
                        />
                      </svg>
                      <p>Female</p>
                    </label>
                    <input
                      className={
                        err.step1.gender ? classes["inputError"] : undefined
                      }
                      onClick={handleChange}
                      onChange={handleChange}
                      id="female"
                      type="radio"
                      value="female"
                      name="gender"
                      checked={formData.step1.gender === "female"}
                    />
                  </div>
                </div>
                <span className={classes["err"]}>{err.step1.gender}</span>
              </div>
            </main>
          </section>

          <section
            className={classes["form-section"]}
            style={{ display: step === 2 ? "flex" : "none" }}
          >
            <header>
              <span>Step {step}/4</span>
              <h2>Profile Information</h2>
            </header>
            <main className={`${classes["profile"]}`}>
              <div className={classes["input-box"]}>
                <label htmlFor="username">Username</label>
                <span className={classes["status"]}>
                  {err.step2.username ? (
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
                    formData.step2.username && (
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
                  className={
                    err.step2.username ? classes["inputError"] : undefined
                  }
                  value={formData.step2.username}
                  onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  placeholder=""
                />
                <span className={classes["err"]}>{err.step2.username}</span>
              </div>
              <div className={classes["input-box"]}>
                <label className={classes["fileLabel"]} htmlFor="file">
                  <span>
                    {fileUrl ? "Choose another image" : "Add an Avatar"}
                  </span>
                  {fileUrl === null ? (
                    <img src={AddIcon} alt="" />
                  ) : (
                    <img
                      className={classes["displayed-upload"]}
                      src={fileUrl}
                      alt="Your Avatar"
                    />
                  )}
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChange}
                />
              </div>
            </main>
          </section>

          <section
            className={classes["form-section"]}
            style={{ display: step === 3 ? "flex" : "none" }}
          >
            <header>
              <span>Step {step}/4</span>
              <h2>Terms and Conditions</h2>
            </header>
            <main>
              <TermsOfService />
              <PrivacyPolicy />
              <div className={classes["check-box"]}>
                <input
                  value={formData.step3.termsCheck === "" ? "checked" : ""}
                  onChange={handleChange}
                  onClick={handleChange}
                  type="checkbox"
                  name="termsCheck"
                  id="termsCheck"
                  checked={formData.step3.termsCheck === "checked"}
                />
                <label className={classes["checkLabel"]} htmlFor="termsCheck">
                  {formData.step3.termsCheck === "checked" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--brand)"
                        d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--text-2)"
                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
                      />
                    </svg>
                  )}

                  <p>I accept the Terms of service and Privacy Policy</p>
                </label>
              </div>
            </main>
          </section>

          <section
            className={classes["form-section"]}
            style={{ display: step === 4 ? "flex" : "none" }}
          >
            <header>
              <span>Step {step}/4</span>
              <h2>Final Check</h2>
            </header>
            <main>
              <div className={classes["review"]}>
                <img src={review} alt="" />
                <p>
                  Go back and review all inputs you've filled and then confirm
                  below to submit. Also an email verification mail has been sent
                  to your email address, verify your mail to complete your
                  registration.
                </p>
              </div>
              <div className={classes["check-box"]}>
                <input
                  value={formData.step4.confirmCheck === "" ? "checked" : ""}
                  onChange={handleChange}
                  onClick={handleChange}
                  type="checkbox"
                  name="confirmCheck"
                  id="confirmCheck"
                  checked={formData.step4.confirmCheck === "checked"}
                />

                <label className={classes["checkLabel"]} htmlFor="confirmCheck">
                  {formData.step4.confirmCheck === "checked" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--brand)"
                        d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--text-2)"
                        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
                      />
                    </svg>
                  )}

                  <p>All details entered are correct and accurate</p>
                </label>
              </div>
            </main>
          </section>

          <div className={classes["formBtns"]}>
            <p>
              Have an account? <Link to="/auth/login">Sign In</Link>
            </p>
            <div className={classes["formStepBtns"]}>
              {step > 1 && (
                <input
                  onChange={handleChange}
                  type="button"
                  onClick={() => {
                    setStep(step - 1);
                  }}
                  className={classes["prev"]}
                  value={`Prev`}
                />
              )}
              {step < 4 ? (
                <input
                  onChange={handleChange}
                  type="button"
                  onClick={() => {
                    isStepValid
                      ? setStep(step + 1)
                      : dispatchAction(
                          "register_status",
                          "dynamic",
                          "fail",
                          "Complete all required fields"
                        );;
                  }}
                  className={`${classes["next"]} ${
                    !isStepValid ? "disabled" : undefined
                  }`}
                  value={`Next`}
                />
              ) : (
                <button
                  type="submit"
                  className={
                    isSubmitting || !isStepValid ? "disabled" : undefined
                  }
                  onClick={() => {
                    !isStepValid &&
                      dispatchAction(
                        "register_status",
                        "dynamic",
                        "fail",
                        "Complete all required fields"
                      );
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

export const action = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("psw"),
    firstName: data.get("firstName"),
    middleName: data.get("middleName"),
    lastName: data.get("lastName"),
    gender: data.get("gender"),
    dob: data.get("dob"),
    address: data.get("address"),
    bio: data.get("bio"),
    username: data.get("username"),
    file: data.get("file"),
  };

  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    gender,
    dob,
    address,
    bio,
    username,
    file,
  } = authData;

  try {
    // Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${username + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        // Update profile
        await updateProfile(res.user, {
          displayName: username,
          photoURL: downloadURL,
        });

        // Create user on firestore
        await setDoc(
          doc(
            db,
            `${middleName.toLowerCase() !== "admin" ? "users" : "admins"}`,
            res.user.uid
          ),
          {
            uid: res.user.uid,
            firstName,
            middleName,
            lastName,
            username,
            email,
            gender,
            dob,
            address,
            bio,
            followers: [],
            following: [],
            posts: [],
            personalChats: [],
            groups: [],
            listings: [],
            photoURL: downloadURL,
            createdAt: serverTimestamp(),
          }
        );

        // Create empty user chats on firestore
        await setDoc(doc(db, "personalChats", res.user.uid), []);
        await setDoc(doc(db, "personalPosts", res.user.uid), []);
        await setDoc(doc(db, "listings", res.user.uid), []);

        return ["success"];
      });
    });
  } catch (err) {
    if (err.code === "auth/network-request-failed") {
      return ["failed", err.code];
    } else if (err.code === "auth/too-many-requests") {
      return ["failed", err.code];
    } else {
      return ["failed", err.code];
    }
  }
};
