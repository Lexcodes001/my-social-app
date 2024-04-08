import genclasses from "./Navigation.module.css";
import classes from './AuthNavigation.module.css';
import LogoImage from "../../components/UI/Logo/Logo";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { ThemeContext } from "../../context/ThemeContext";
import NavigationWrapper from "./NavigationWrapper";
import SideMenu from "../Menu/SideMenu";
import Hamburger from "hamburger-react";
import { AnimatePresence } from "framer-motion";

const AuthNavigation = () => {
  const [isOpen, setIsOpen] = useState();
  const [pageName, setPageName] = useState("");
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  //  const [activeLink, setActiveLink] = useState(null);
  //  const divRefs = useRef([]);

  //  useEffect(() => {
  //    const observer = new IntersectionObserver(
  //      (entries) => {
  //        entries.forEach((entry) => {
  //          if (entry.isIntersecting) {
  //            const linkId = entry.target.getAttribute("id");
  //            setActiveLink(linkId);
  //          }
  //        });
  //      },
  //      { rootMargin: "-20% 0% -80% 0%" }
  //    );

  //    divRefs.current.forEach((div) => observer.observe(div));

  //    return () => {
  //      divRefs.current.forEach((div) => observer.unobserve(div));
  //    };
  //  }, []);

  //  const handleDivRef = (ref) => {
  //    if (ref) {
  //      divRefs.current.push(ref);
  //    }
  //  };

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

  const Links = [
    {
      id: 'feature',
      url: "/auth/#feature",
      name: "Features",
      icon: "",
    },
    {
      id: 'discover',
      url: "/auth/#discover",
      name: "Discover",
      icon: "",
    },
    {
      id: 'stories',
      url: "/auth/#stories",
      name: "Stories",
      icon: "",
    },
    {
      id: 'community',
      url: "/auth/#community",
      name: "Top Community",
      icon: "",
    },
    {
      id: 'blog',
      url: "/auth/#blog",
      name: "What's Update",
      icon: "",
    },
  ];

  return (
    <>
      <NavigationWrapper>
        <div className={`${genclasses["left"]}`}>
          <LogoImage name />
        </div>
        <div className={`${genclasses["center"]}`}>
          <div className={`${classes["sm-screen"]}`}></div>
          <div className={`${classes["lg-screen"]}`}>
            {Links.map((link) => (
              <NavHashLink
              key={link.id}
                to={link.url}
                activeClassName={[classes["link"], classes.active].join(" ")}
                activeStyle={{ color: "red" }}
                className={classes["link"]}
                smooth
              >
                <span className={`${classes["icon"]}`}>{link.icon}</span>
                <span className={`${classes["text"]}`}>
                  {link.id.toLocaleUpperCase()}
                </span>
              </NavHashLink>
            ))}
          </div>
        </div>
        <div className={`${genclasses["right"]}`}>
          <div className={classes["page-links"]}>
            <NavLink
              to="/auth/login/"
              className={({ isActive }) => isActive ? classes["active"] : ''}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/auth/signup"
              className={({ isActive }) => isActive ? classes["active"] : ''}
            >
              Register
            </NavLink>
          </div>
          <Hamburger
            size={15}
            distance="sm"
            rounded
            hideOutline={false}
            toggled={isOpen}
            color={isOpen ? "var(--brand)" : "var(--text-1)"}
            toggle={() => setIsOpen((isOpen) => !isOpen)}
          />
        </div>
      </NavigationWrapper>
      <AnimatePresence>
        {(isOpen || window.innerWidth > 767) && (
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen}>
            {Links.map((link) => (
              <NavHashLink
              key={link.id}
                to={link.url}
                activeClassName={[classes["div-link"], classes.active].join(" ")}
                activeStyle={{ color: "red" }}
                className={classes["div-link"]}
                smooth
              >
                <span className={`${classes["icon"]}`}>{link.icon}</span>
                <span className={`${classes["text"]}`}>
                  {link.id.toLocaleUpperCase()}
                </span>
              </NavHashLink>
            ))}
          </SideMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthNavigation;
