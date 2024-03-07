import classes from "./SideMenu.module.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggle from "../UI/Theme/Theme";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import UserMenu from "../Navbar/UserMenu";

const SideMenu = ({ isOpen, setIsOpen }) => {
  const { loading, currentUser, currentUserRole, currentUserDetails } =
    useContext(AuthContext);
  // console.log(currentUserDetails);
  const currentLinks = {
    isAuth: [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="var(--text-2)"
              d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z"
            />
          </svg>
        ),
        url: "/",
        text: "Home",
        end: true,
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="var(--text-2)"
              d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Zm120-80h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z"
            />
          </svg>
        ),
        url: "messenger",
        text: "Chats",
        end: false,
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="var(--text-2)"
              d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
            />
          </svg>
        ),
        url: "notifications",
        text: "Notifications",
        end: false,
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="var(--text-2)"
              d="M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-360h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"
            />
          </svg>
        ),
        url: "dashboard",
        text: "Dashboard",
        end: false,
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="var(--text-2)"
              d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
            />
          </svg>
        ),
        url: `profile/${!loading && currentUserDetails.username}`,
        text: "My Profile",
        end: false,
      },
    ],
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: 10,
        }}
        onClick={() => {
          setIsOpen(false);
        }}
        className={`${classes["overlay"]}`}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {type: "tween", when: "beforeChildren", staggerChildren: 1 },
        }}
        exit={{
          opacity: 0,
          x: -30,
          transition: {type: "tween", when: "afterChildren", staggerChildren: 1 },
        }}
        className={`${classes["menu-container"]}`}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -30,
            // transition: { duration: 2 }
          }}
          className={`${classes["top"]}`}
        >
          <motion.div className={`${classes["icons"]}`}>
            <div className={classes["logoText"]}>
            <Link>
              <UserMenu />
            </Link>
              Trendbyte
              </div>
            <button
              style={{
                border: `2px solid ${
                  isOpen ? "var(--brand)" : "var(--text-1)"
                }`,
              }}
            >
              <Hamburger
                size={20}
                distance="sm"
                toggled={isOpen}
                color={isOpen ? "var(--brand)" : "var(--text-1)"}
                rounded
                toggle={() => setIsOpen((isOpen) => !isOpen)}
              />
            </button>

            {/* <span className={`${classes["close"]}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </span>  */}
          </motion.div>

          <motion.div className={classes["details"]}>
            <motion.div className={`${classes["names"]}`}>
              <motion.div className={`${classes["firstname"]}`}>
                Welcome {!loading && currentUserDetails.firstName}!
              </motion.div>
              <motion.div className={`${classes["username"]}`}>
                @{!loading && currentUser.displayName}
              </motion.div>
            </motion.div>
            <motion.div className={`${classes["follows"]}`}>
              <p>
                <span className={classes["count"]}>
                  {!loading && currentUserDetails.followers.length}
                </span>
                <span>followers</span>
              </p>
              <p>
                <span className={classes["count"]}>
                  {!loading && currentUserDetails.following.length}
                </span>
                <span>following</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -30,
            // transition: { duration: 2 }
          }}
          className={`${classes["center"]}`}
        >
          {currentLinks["isAuth"].map((link) => (
            <NavLink
              key={link.url}
              className={({ isActive }) =>
                isActive
                  ? [classes["link"], classes.active].join(" ")
                  : classes["link"]
              }
              to={link.url}
              end={link.end}
            >
              <span className={`${classes["icon"]}`}>{link.icon}</span>
              <span className={`${classes["text"]}`}>{link.text}</span>
            </NavLink>
          ))}
        </motion.div>
        <motion.div
          className={`${classes["bottom"]}`}
        >
          <ThemeToggle style={"close"} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideMenu;
