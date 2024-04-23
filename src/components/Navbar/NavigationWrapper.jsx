import { useState } from "react";
import classes from "./Navigation.module.css";

const NavigationWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`${classes.navbar}`}>
      {isOpen && (
        <div className={classes["notice-bar"]}>
          <div className={classes["content"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            laoreet et massa venenatis molestie. Pellentesque facilisis lacinia
            nunc id suscipit.
          </div>
          <span onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="17"
              viewBox="0 -960 960 960"
              width="17"
            >
              <path
                fill="var(--surface-1)"
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </span>
        </div>
      )}
      <nav>{children}</nav>
    </div>
  );
};

export default NavigationWrapper;
