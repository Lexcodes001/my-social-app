import { useContext, useEffect, useRef } from "react";
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
import { useLocation } from "react-router-dom";

const LogoImage = ({name}) => {
  const [goingDown, setGoingDown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [page, setPage] = useState();
  const [pageName, setPageName] = useState("");
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  const lastScrollPosition = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > lastScrollPosition.current) {
        setGoingDown(true);
      } else {
        setGoingDown(false);
      }

      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 100 ||
        window.pageYOffset === 0
      ) {
        setGoingDown(false);
      }

      lastScrollPosition.current = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const generatePageName = (str) => {
      // Extract the first character and the rest of the string
      const firstLetter = str[0];
      const remainingString = str.slice(1);
      const slicedString = str.slice(1, 5);

      if (slicedString === "auth") {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }

      // Capitalize the first letter and combine it with the remaining string
      const result =
        remainingString.charAt(0) === "p"
          ? "Profile"
          : remainingString.charAt(0).toUpperCase() + remainingString.slice(1);

      if (str === "/") {
        return "Home";
      } else {
        return result;
      }
    };
    let pathname = location.pathname;
    setPageName(generatePageName(pathname));
  }, [location]);

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
      {name && (
        <span>
          <p
            className={`${
              isAuth && goingDown
                ? classes["fade-in-bottom-one"]
                : classes["fade-in-top-one"]
            }`}
          >
            TriBe
          </p>
          <p
            className={`${
              isAuth && goingDown
                ? classes["fade-in-top-one"]
                : classes["fade-in-bottom-one"]
            }`}
          >
            {pageName}
          </p>
        </span>
      )}
    </span>
  );
};

export default LogoImage;
