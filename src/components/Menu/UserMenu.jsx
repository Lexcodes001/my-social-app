import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { LogoutContext } from "../../pages/Root/Root";
import classes from "./UserMenu.module.css";
import { useRouteLoaderData } from "react-router-dom";

const UserMenu = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("user", user);
  const currentUser = user.user;
  const currentUserDetails = user.result[1];
  const logout = useContext(LogoutContext);
  const newRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        newRef.current &&
        !newRef.current.contains(e.target) &&
        !imgRef.current.contains(e.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes["user"]}>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              y: 30,
            }}
            ref={newRef}
            className={`${classes["profile"]}`}
          >
            <div className={`${classes["details"]}`}>
              <span>
                <div>
                  <p className={`${classes[""]} ${classes.firstname}`}>
                    {currentUserDetails.firstName}
                  </p>
                  <p className={`${classes[""]} ${classes.username}`}>
                    {currentUser.displayName}
                  </p>
                </div>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    fill="var(--text-2)"
                    d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm7-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
                  />
                </svg>
              </span>
            </div>
            <div className={`${classes["groups"]}`}>
              {currentUserDetails.groups.length === 0 ? (
                <p className={classes["empty"]}>You have no groups</p>
              ) : (
                <>
                  {currentUserDetails.groups.map((group) => {
                    <div className={`${classes["group"]}`}>
                      <span>
                        <img src={group.displayPicture} alt="dp" />
                        <div>
                          <p className={`${classes[""]} ${classes.name}`}>
                            {group.name}
                          </p>
                          <p className={`${classes["groupCount"]}`}>
                            {group.members.length} members
                          </p>
                        </div>
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path
                            fill="var(--text-2)"
                            d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm7-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
                          />
                        </svg>
                      </span>
                    </div>;
                  })}
                </>
              )}
            </div>
            <span
              className={`${classes["item"]} ${classes.logout}`}
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 25"
                width='24px'
                height='24'
              >
                <path
                  fill="var(--text-2)"
                  class="cls-1"
                  d="m18.75,18v1c0,.96-.79,1.75-1.75,1.75h-3.92c.11-.33.17-.67.17-1.03v-.47h3.75c.14,0,.25-.11.25-.25v-1c0-.41.34-.75.75-.75s.75.34.75.75Zm-5.5-13.25h3.75c.14,0,.25.11.25.25v1c0,.41.34.75.75.75s.75-.34.75-.75v-1c0-.96-.79-1.75-1.75-1.75h-3.92c.11.33.17.67.17,1.03v.47Zm8.28,6.72l-3-3c-.29-.29-.77-.29-1.06,0-.29.29-.29.77,0,1.06l1.72,1.72h-5.19c-.41,0-.75.34-.75.75s.34.75.75.75h5.19l-1.72,1.72c-.29.29-.29.77,0,1.06.15.15.34.22.53.22s.38-.07.53-.22l3-3c.29-.29.29-.77,0-1.06ZM11.078,2.902c-.428-.334-.972-.451-1.502-.319l-6,1.5c-.78.195-1.325.894-1.325,1.698v12.438c0,.805.545,1.503,1.325,1.698l6.001,1.5c.142.035.285.053.427.053.386,0,.762-.128,1.074-.372.427-.334.672-.836.672-1.379V4.281c0-.543-.245-1.045-.672-1.379Z"
                />
              </svg>
              Log out
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {currentUser && (
        <div className={classes["details-box"]}>
          <span></span>
          <img
            onClick={() => {
              setIsModalOpen((prev) => !prev);
            }}
            className={classes["dp"]}
            src={currentUser.photoURL}
            alt=""
            ref={imgRef}
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
