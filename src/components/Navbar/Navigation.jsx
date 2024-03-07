import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import classes from "./Navigation.module.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggle from "../../components/UI/Theme/Theme";
import LogoImage from "../../components/UI/Logo/Logo";
import SideMenu from "../Menu/SideMenu";
import { ThemeContext } from "../../context/ThemeContext";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const [goingDown, setGoingDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const { theme } = useContext(ThemeContext);
  const { currentUser, currentUserDetails } = useContext(AuthContext);
  // console.log(currentUser);
  let currentUrl = window.location.pathname + window.location.search;

  useEffect(() => {
    let lastScrollPosition = window.pageYOffset;

    const handleScroll = () => {
      // if (data.length !== 0) {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > lastScrollPosition) {
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

      lastScrollPosition = currentScrollPosition;
      // }
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
    let pathname = window.location.pathname;
    setPageName(generatePageName(pathname));
  }, [window.location.pathname]);

  return (
    <>
      <div className={`${classes["navbar"]}`}>
        <div
          className={`${
            goingDown
              ? classes["fade-in-top-one"]
              : classes["fade-in-bottom-one"]
          } ${classes["top"]} ${classes.second}`}
        >
          <span className={classes["logoItem"]}>
            <p className={`${classes[""]} ${classes.logoText}`}>Trend</p>
            <LogoImage />
            <p className={`${classes[""]} ${classes.logoText}`}>Byte</p>
          </span>
          <span className={classes["pageName"]}>{pageName}</span>
        </div>
        <div
          className={`${
            goingDown
              ? classes["fade-in-bottom-one"]
              : classes["fade-in-top-one"]
          } ${classes["top"]}`}
        >
          <span className={classes["item"]}>
            <button style={{}}>
              {currentUser && window.innerWidth > 600 ? (
                <img src={currentUser.photoUrl} alt="" />
              ) : (
                currentUser && (
                  <Hamburger
                    size={20}
                    distance="sm"
                    rounded
                    hideOutline={false}
                    toggled={isOpen}
                    color={isOpen ? "var(--brand)" : "var(--text-1)"}
                    toggle={() => setIsOpen((isOpen) => !isOpen)}
                  />
                )
              )}
            </button>
          </span>
          <span className={classes["logoItem"]}>
            <p className={`${classes[""]} ${classes.logoText}`}>Trend</p>
            <LogoImage />
            <p className={`${classes[""]} ${classes.logoText}`}>Byte</p>
          </span>
          <span className={`${classes["item"]} ${classes.user}`}>
            <UserMenu />
          </span>
        </div>
      </div>
      <AnimatePresence>
        {(isOpen || window.innerWidth > "600") && (
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
