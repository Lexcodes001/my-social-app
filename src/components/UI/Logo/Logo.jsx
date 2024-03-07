import { useContext } from "react";
// import ShortLight from "../../../assets/images/trendbyte_short_light.png";
// import ShortDark from "../../../assets/images/trendbyte_short_dark.png";
// import LongLight from "../../../assets/images/trendbyte_long_light.png";
// import LongDark from "../../../assets/images/trendbyte_long_dark.png";
import LightLogo from "../../../assets/images/trendbyte_new_light.png";
import DarkLogo from "../../../assets/images/trendbyte_new_dark.png";
import PurpleLogo from "../../../assets/images/trendbyte_purple.png";
import { useState } from "react";
import classes from "./Logo.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

const LogoImage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <span className={classes["logo"]}>
      <img
        src={
          theme === "dark" || theme === "dim" || theme === "choco"
            ? LightLogo
            : DarkLogo
        }
        alt="logo"
      />
    </span>
  );
};

export default LogoImage;
