import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useRouteLoaderData } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import classes from "./Navigation.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import LogoImage from "../../components/UI/Logo/Logo";
import SideMenu from "../Menu/SideMenu";
import { ThemeContext } from "../../context/ThemeContext";
import UserMenu from "./UserMenu";

const MainNavigation = ({ user }) => {
  const [goingDown, setGoingDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const userDetailsObj = user;
  const currentUserDetails = userDetailsObj.result[1];

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
    <>
      <div className={`${classes["navbar"]}`}>
        <div
          className={`${
            goingDown
              ? classes["fade-in-top-one"]
              : classes["fade-in-bottom-one"]
          } ${classes["top"]} ${classes.second}`}
        >
          <span className={classes["logoImage"]}>
            <LogoImage />
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
          <span className={classes["mobile"]}>
            <button style={{}}>
              {currentUserDetails && window.innerWidth > 767 ? (
                <img src={currentUserDetails.photoUrl} alt="" />
              ) : (
                currentUserDetails && (
                  <Hamburger
                    size={15}
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
          <span className={`${classes["mobile"]} ${classes.image}`}>
            <LogoImage />
          </span>
          <span className={`${classes["mobile"]} ${classes.user}`}>
            <UserMenu />
          </span>
          <span className={classes["tablet"]}>
            <span className={`${classes["logo"]}`}>
              <span className={classes["image"]}>
                <LogoImage />
              </span>
              <p className={`${classes.text}`}>TrendBook</p>
            </span>
            <span className={`${classes.user}`}>
              <UserMenu />
            </span>
          </span>
        </div>
      </div>
      <AnimatePresence>
        {(isOpen || window.innerWidth > 767) && (
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavigation;
