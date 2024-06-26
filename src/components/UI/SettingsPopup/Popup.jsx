import React, { useContext, useState, useEffect } from "react";
import classes from "./Popup.module.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

const themeObj = {
  lightTheme: ["light", "grape"],
  darkTheme: ["dark", "dim", "choco"],
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
      <AnimatePresence>
        {isOpen && (
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
        )}
        <motion.div
          drag="y"
          dragConstraints={{ bottom: 10, top: 10 }}
          dragSnapToOrigin
          dragElastic={0.4}
          dragDirectionLock
          onDirectionLock={(axis) => console.log(axis)}
          onDragEnd={(e, { offset, velocity }) => {
            console.log(offset.y);
            if (offset.y > 130) {
              setIsOpen(false);
            } else if (offset.y < 130) {
              setIsOpen(true);
            }
          }}
          className={`${classes["popup"]} ${
            isOpen ? classes["open"] : classes["close"]
          }`}
          //   onClick={() => setIsOpen(true)}
        >
          <motion.span className={classes["smRect"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 512 640"
            >
              <path fill="var(--surface-1)" d="M335.052,171.058c-21.116-21.115-49.19-32.744-79.052-32.744c-29.862,0-57.937,11.63-79.052,32.745L72.003,276.004  c-11.18,11.181-17.337,26.045-17.337,41.855c0,15.812,6.157,30.676,17.337,41.854c23.079,23.081,60.632,23.081,83.712,0.002  L256,259.431l100.285,100.284c11.18,11.18,26.045,17.337,41.856,17.337c15.811-0.001,30.676-6.158,41.855-17.338  c11.18-11.18,17.337-26.045,17.337-41.856c0-15.812-6.158-30.676-17.337-41.855L335.052,171.058z" />
            </svg>
          </motion.span>
          <motion.main className={classes["popup-box"]}>
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
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Popup;
