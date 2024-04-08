import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation, useRouteLoaderData } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import classes from "./MainNavigation.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import LogoImage from "../../components/UI/Logo/Logo";
import SideMenu from "../Menu/SideMenu";
import { ThemeContext } from "../../context/ThemeContext";
import UserMenu from "../Menu/UserMenu";
import BottomNavigation from "./BottomNavigation";
import Navigation from "./NavigationWrapper";
import NavigationWrapper from "./NavigationWrapper";

const MainNavigation = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <NavigationWrapper>
        <div className={`${classes["left"]}`}>
          <LogoImage name />
        </div>
        <div className={`${classes["right"]}`}>
          <UserMenu user={user} />
        </div>

        {/* <>
        <div className={`${classes["top"]} ${classes.second}`}>
          <span className={classes["logoImage"]}></span>
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
      </> */}
        <AnimatePresence>
          {(isOpen || window.innerWidth > 767) && (
            <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
          )}
        </AnimatePresence>
      </NavigationWrapper>
      <BottomNavigation user={user} />
    </>
  );
};

export default MainNavigation;
