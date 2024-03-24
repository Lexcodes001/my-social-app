import classes from "./AlertBox.module.css";
import { AnimatePresence, motion } from "framer-motion";

import { AlertContext } from "../../../context/AlertContext";
import { useContext } from "react";

export const AlertBox = ({ arr, filteredArr }) => {
  const { alertObjState, dispatchAction } = useContext(AlertContext);

  const getProp = (params) => {
    let index = arr.indexOf(params);

    const finalProp =
      index === 0
        ? "internet_status"
        : index === 1
        ? "login_status"
        : "register_status";
    return { index, finalProp };
  };

  return (
    <AnimatePresence>
      <motion.div
        className={classes["info-container"]}
        initial={{
          scale: 0,
          opacity: 0,
          left: "40%",
          x: "-40%",
          transition: {
            type: "spring",
            duration: 1.5,
          },
        }}
        animate={{
          scale: 1,
          opacity: 1,
          left: `${
            window.innerWidth < 769
              ? "50%"
              : window.innerWidth > 991
              ? "50%"
              : window.innerWidth > 769
              ? "50%"
              : "50%"
          }`,
          x: `${
            window.innerWidth < 769
              ? "-50%"
              : window.innerWidth > 991
              ? "-50%"
              : window.innerWidth > 769
              ? "-50%"
              : "-50%"
          }`,
          transition: {
            type: "spring",
            duration: 0.8,
          },
        }}
        exit={{
          scale: 0,
          opacity: 0,
          left: "40%",
          x: "-40%",
          transition: {
            type: "spring",
            duration: 1.5,
          },
        }}
      >
        <AnimatePresence>
          {filteredArr.map((arr) => (
            <motion.div
              key={arr.text + Math.random()}
              style={{
                zIndex: `${getProp().index + 5}`,
                marginTop: `${getProp().index !== 0 ? "-10px" : "5px"}`,
              }}
              className={classes["alert-box"]}
              initial={{ opacity: 0, x: 100, scale: 0 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <span className={classes["emoticon"]}>
                {arr.mode === "fail" ? (
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
                )}
              </span>
              <span className={`${classes["txt"]} ${classes[arr.mode] || ""}`}>
                {arr.text}
              </span>
              <span
                className={classes["close"]}
                onClick={() =>
                  dispatchAction(getProp(arr).finalProp, "close", "", "")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                >
                  <path
                    fill="var(--txt-two)"
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                  />
                </svg>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlertBox;
