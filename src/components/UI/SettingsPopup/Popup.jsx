import React, { useContext, useState, useEffect } from "react";
import classes from "./Popup.module.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

const themeObj = {
  lightTheme: ["light", "grape", "choco"],
  darkTheme: ["dark", "dim"],
};

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [thisTheme, setThisTheme] = useState("default");
  const [mode, setMode] = useState(localStorage.getItem("theme") || "");
  const { theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    Object.entries(themeObj).forEach(([prop, arr]) => {
      // Check if the array contains the search value
      if (arr.includes(theme)) {
        setThisTheme(`${prop}`);
        console.log(`${prop}`);
      } else {
        console.log(`${prop}`);
      }
    });
  }, []);

  useEffect(() => {
    mode !== "" && changeTheme(mode.toLowerCase());
  }, [mode]);

  const capitalize = (str) => {
    // Extract the first character and the rest of the string
    const firstLetter = str[0];
    const remainingString = str.slice(0);

    // Capitalize the first letter and combine it with the remaining string
    const result =
      firstLetter.charAt(0).toUpperCase() + remainingString.slice(1);
    return result;
  };

  return (
    <>
      {!isOpen ? (
        <motion.span
          whileHover={{ scale: 1.3 }}
          drag="y"
          dragConstraints={{ bottom: 0, top: 10 }}
          dragSnapToOrigin
          dragElastic={0.2}
          dragDirectionLock
          onDirectionLock={(axis) => console.log(axis)}
          onDragEnd={(axis) => setIsOpen(true)}
          //   onClick={() => setIsOpen(true)}
          className={`${classes["smRect"]} ${classes["close"]}`}
        ></motion.span>
      ) : (
        <AnimatePresence>
          <div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setIsOpen(false)}
            className={classes["overlay"]}
          ></div>
          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 10 }}
            dragDirectionLock
            // onDirectionLock={(axis) => console.log(axis)}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 130) {
                setIsOpen(false);
              } else {
                return;
              }
            }}
            className={classes["popup"]}
          >
            <motion.span
              className={`${classes["smRect"]} ${classes["open"]}`}
            ></motion.span>
            <section className={classes["theme"]}>
              <h2>Select Theme:</h2>
              <div className={classes["optionBox"]}>
                <label htmlFor="lightTheme">
                  <p
                    className={`${
                      thisTheme === "lightTheme" && classes["checked"]
                    }`}
                  >
                    Light
                  </p>
                  {thisTheme === "lightTheme" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--brand)"
                        d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
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
                        d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                      />
                    </svg>
                  )}
                </label>
                <input
                  type="radio"
                  name="lightTheme"
                  id="lightTheme"
                  value="lightTheme"
                  checked={thisTheme === "lightTheme"}
                  onChange={(e) => {
                    setThisTheme(e.target.value);
                    setMode("light");
                  }}
                />
              </div>
              <div className={classes["optionBox"]}>
                <label htmlFor="darkTheme">
                  <p
                    className={`${
                      thisTheme === "darkTheme" && classes["checked"]
                    }`}
                  >
                    Dark
                  </p>
                  {thisTheme === "darkTheme" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--brand)"
                        d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
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
                        d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                      />
                    </svg>
                  )}
                </label>
                <input
                  type="radio"
                  name="darkTheme"
                  id="darkTheme"
                  value="darkTheme"
                  checked={thisTheme === "darkTheme"}
                  onChange={(e) => {
                    setThisTheme(e.target.value);
                    setMode("dark");
                  }}
                />
              </div>
              <div className={classes["optionBox"]}>
                <label htmlFor="default">
                  <p
                    className={`${
                      thisTheme === "default" && classes["checked"]
                    }`}
                  >
                    Use device settings
                  </p>
                  {thisTheme === "default" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        fill="var(--brand)"
                        d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
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
                        d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                      />
                    </svg>
                  )}
                </label>
                <input
                  type="radio"
                  name="default"
                  id="default"
                  value="default"
                  checked={thisTheme === "default"}
                  onChange={(e) => {
                    setThisTheme(e.target.value);
                    setMode("");
                  }}
                />
              </div>
            </section>
            {thisTheme !== "default" && (
              <section className={classes["mode"]}>
                <h3>
                  Which {thisTheme === "lightTheme" ? "Light" : "Dark"} theme?
                </h3>
                {themeObj[`${thisTheme}`].map((thisMode) => (
                  <div key={thisMode} className={classes["optionBox"]}>
                    <label htmlFor={thisMode}>
                      <p
                        className={`${mode === thisMode && classes["checked"]}`}
                      >
                        {thisMode === "dark"
                          ? "Lights out"
                          : thisMode === "light"
                          ? "Bright"
                          : capitalize(thisMode)}
                      </p>
                      {mode === thisMode ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path
                            fill="var(--brand)"
                            d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
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
                            d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                          />
                        </svg>
                      )}
                    </label>
                    <input
                      type="radio"
                      name={thisMode}
                      id={thisMode}
                      value={thisMode}
                      checked={mode === thisMode}
                      onChange={(e) => setMode(e.target.value)}
                    />
                  </div>
                ))}
              </section>
            )}
          </motion.main>
        </AnimatePresence>
      )}
    </>
  );
};

export default Popup;
