import { useContext, useState } from "react";
import classes from "./Theme.module.css";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";

const ThemeToggle = ({ style }) => {
  const [isOpen, setIsOpen] = useState(style === "open" ? true : false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <motion.div
        className={`${classes.menu} ${
          isOpen ? classes.openMenu : classes.closeMenu
        }`}
      >
        {style === "open" ? null : (
          <motion.div
            className={classes.icon}
            onClick={() => {
              setIsOpen((prev) => {
                return !prev;
              });
            }}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="times"
              >
                <path
                  fill="var(--txt-two)"
                  d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="ellipsis-v"
              >
                <path
                  fill="var(--txt-two)"
                  d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"
                ></path>
              </svg>
            )}
          </motion.div>
        )}
        {isOpen && (
          <motion.div className={classes.toggle__container}>
            <motion.div
              onClick={() => toggleTheme()}
              className={classes.toggle__box}
            >
              <motion.span
                className={`${
                  theme === "dark" ? classes.overlay : classes.overlay__light
                }`}
              ></motion.span>
              <motion.span
                className={`${
                  theme === "dark" ? classes.toggle : classes.toggle__light
                }`}
              ></motion.span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ThemeToggle;
