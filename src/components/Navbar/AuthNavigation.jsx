import classes from "./Navigation.module.css";
import LogoImage from "../../components/UI/Logo/Logo";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const AuthNavigation = () => {
  const [pageName, setPageName] = useState("");
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    const handleHistoryChange = () => {
      let history = window.history;
      console.log(history);
      console.log(window.history.length);

      const isSiteVisitedBefore = () => {
        const currentPath = location.pathname;

        // Check if there's any history entry
        if (history.length > 0) {
          // Loop through the history entries
          for (let i = history.length - 1; i >= 0; i--) {
            const historyPath = history.entries[i].pathname;

            // If the current path is found in the history, it means it has been visited before
            if (historyPath === currentPath) {
              return true;
            }
          }
        }

        // If the loop completes without finding the current path in the history,
        // it means this is the first route visited
        return false;
      };

      // const isFirstSiteVisited = !isSiteVisitedBefore();

    };

    handleHistoryChange();

    window.addEventListener("popstate", handleHistoryChange);

    return () => {
      window.removeEventListener("popstate", handleHistoryChange);
    };
  }, []);

  useEffect(() => {
    const generatePageName = (str) => {
      switch (str) {
        case "/auth/login":
          return "Sign In";
          break;
        case "/auth/signup":
          return "Sign Up";
          break;
        case "/auth/reset":
          return "Reset";
          break;

        default:
          break;
      }
    };
    let pathname = location.pathname;
    setPageName(generatePageName(pathname));
  }, [location]);

  return (
    <>
      <div className={`${classes["navbar"]}`}>
        <div className={`${classes["top"]} ${classes["auth"]}`}>
          {/* <span className={classes["pageName"]}>
            {hasHistory ? (
              <button
                className={classes["navigate"]}
                onClick={() => navigate(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    fill={
                      theme === "light" || theme === "grape"
                        ? "var(--text-2)"
                        : "var(--text-2)"
                    }
                    d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z"
                  />
                </svg>
              </button>
            ) : (
              <span className={`${classes["mobile"]} ${classes.logoItem}`}>
                <LogoImage />
              </span>
            )}
            <p>{pageName}</p>
          </span> */}
          <span className={classes["logo"]}>
            <span className={`${classes[""]} ${classes.logoImage}`}><LogoImage /></span>
            <p className={`${classes[""]} ${classes.logoText}`}>Trendbook</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default AuthNavigation;
