import React, { useEffect, useState } from "react";
import classes from "./BottomNavigation.module.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const BottomNavigation = ({ user }) => {
  const currentUserDetails = user.result[1];
  const [active, setActive] = useState("Home");

  const Links = [
    {
      icon: [
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--text-2)"
            d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z"
          />
        </motion.svg>,
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--surface-1)"
            d="M160-200v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H600q-17 0-28.5-11.5T560-160v-200q0-17-11.5-28.5T520-400h-80q-17 0-28.5 11.5T400-360v200q0 17-11.5 28.5T360-120H240q-33 0-56.5-23.5T160-200Z"
          />
        </motion.svg>,
      ],
      url: "/",
      text: "Home",
      end: true,
    },
    {
      icon: [
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--text-2)"
            d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Zm120-80h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z"
          />
        </motion.svg>,
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--surface-1)"
            d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm40-160h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z"
          />
        </motion.svg>,
      ],
      url: "messenger",
      text: "Chats",
      end: false,
    },
    {
      icon: [
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          whileTap={{ scale: 1.2 }}
          height="24"
          viewBox="0 0 99 99"
          width="24"
        >
          <path
            fill="var(--text-2)"
            d="m61.199 7.3867c-7.4922 0-14.738 2.6758-20.43 7.5469-5.6914 4.8711-9.457 11.617-10.617 19.016-1.1602 7.4023 0.36328 14.977 4.2969 21.352l-4.2422 4.2422-2.082-2.0312c-0.82812-0.78125-2.1211-0.78125-2.9492 0l-14.195 14.227c-4.5469 4.8164-4.4375 12.375 0.24609 17.055 4.6836 4.6836 12.238 4.793 17.055 0.25l14.23-14.242c0.39062-0.39062 0.60938-0.91797 0.60938-1.4727s-0.21875-1.082-0.60938-1.4727l-2.082-2.082 4.2891-4.1484c8.3867 5.1289 18.695 6.0352 27.852 2.4531 9.1523-3.5859 16.105-11.25 18.781-20.711 2.6758-9.4609 0.77344-19.629-5.1484-27.477-5.918-7.8516-15.172-12.477-25.004-12.504zm-35.867 78.707c-3.1641 3.1641-8.293 3.1641-11.457 0s-3.1641-8.293 0-11.457l6.3438-6.3555 11.457 11.457zm9.293-9.3008-11.457-11.406 3.457-3.457 11.457 11.457zm2.875-9.918-2.1875-2.1875-2.168-2.1875 3.75-3.75c1.3125 1.6016 2.7773 3.0703 4.375 4.3867zm42.957-8.7812c-5.1094 5.1172-12.047 7.9961-19.281 8s-14.176-2.8672-19.293-7.9844c-5.1172-5.1133-7.9922-12.051-7.9922-19.285s2.875-14.176 7.9922-19.289c5.1172-5.1133 12.059-7.9844 19.293-7.9844 7.2344 0.003907 14.172 2.8828 19.281 8 5.1055 5.1133 7.9727 12.043 7.9766 19.27 0.003906 7.2227-2.8555 14.156-7.9531 19.273zm-16.27-39.168c-0.023438 0.55469-0.26562 1.0742-0.67578 1.4492-0.41016 0.37109-0.94922 0.56641-1.5 0.54297-5.0469-0.25391-9.9648 1.6367-13.543 5.207-0.89844 0.90234-1.6992 1.8945-2.3945 2.957-0.38281 0.59766-1.043 0.95703-1.75 0.96094-0.40234-0.003907-0.78906-0.11719-1.125-0.33594-0.46875-0.29688-0.79688-0.76953-0.91406-1.3125-0.11719-0.53906-0.011718-1.1055 0.28906-1.5703 0.85547-1.3164 1.8477-2.5391 2.957-3.6484 4.4062-4.3906 10.453-6.7305 16.668-6.4453 0.55469 0.023437 1.0781 0.26953 1.4531 0.68359 0.375 0.41016 0.56641 0.95703 0.53516 1.5117z"
          />
        </motion.svg>,
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          whileTap={{ scale: 1.2 }}
          height="24"
          viewBox="0 0 99 99"
          width="24"
        >
          <path
            fill="var(--surface-1)"
            d="m83.426 16.594c-7.3281-7.2969-17.781-10.52-27.949-8.6172-10.168 1.9023-18.75 8.6875-22.945 18.141-4.1953 9.4531-3.4727 20.367 1.9375 29.184l-4.2617 4.2422-2.082-2.0312c-0.82812-0.78125-2.1211-0.78125-2.9492 0l-4.9258 4.9258 17.293 17.301 4.9375-4.9375c0.39062-0.39062 0.60938-0.91797 0.60938-1.4727s-0.21875-1.082-0.60938-1.4727l-2.082-2.082 4.3203-4.1484c8.8164 5.4102 19.73 6.1328 29.184 1.9375 9.457-4.1953 16.238-12.777 18.141-22.945 1.9023-10.168-1.3203-20.621-8.6172-27.949zm-21.414 4.3242c-5.0469-0.25391-9.9648 1.6367-13.543 5.207-0.89844 0.90234-1.6992 1.8945-2.3945 2.957-0.38281 0.59766-1.043 0.95703-1.75 0.96094-0.40234-0.003907-0.78906-0.11719-1.125-0.33594-0.46875-0.29688-0.79688-0.76953-0.91406-1.3125-0.11719-0.53906-0.011718-1.1055 0.28906-1.5703 0.85547-1.3164 1.8477-2.5391 2.957-3.6484 4.4062-4.3906 10.453-6.7305 16.668-6.4453 1.1484 0.050781 2.0391 1.0234 1.9883 2.1758s-1.0273 2.043-2.1758 1.9883zm-44.68 44.469 17.293 17.301-6.3438 6.3555c-2.2695 2.4062-5.418 3.7891-8.7266 3.8359-3.3047 0.050782-6.4922-1.2422-8.832-3.582-2.3359-2.3398-3.6289-5.5234-3.582-8.832s1.4336-6.457 3.8398-8.7266z"
          />
        </motion.svg>,
      ],
      url: "search",
      text: "Search",
      end: false,
    },
    {
      icon: [
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--text-2)"
            d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
          />
        </motion.svg>,
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--surface-1)"
            d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"
          />
        </motion.svg>,
      ],
      url: "notifications",
      text: "Notices",
      end: false,
    },
    {
      icon: [
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--text-2)"
            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
          />
        </motion.svg>,
        <motion.svg
          whileTap={{ scale: 1.2 }}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            fill="var(--surface-1)"
            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z"
          />
        </motion.svg>,
      ],
      url: `profile/${currentUserDetails.username}`,
      text: "Profile",
      end: false,
    },
  ];

  useEffect(() => {}, []);

  const setActiveLink = (text) => {
    setActive(text);
    return;
  };

  return (
    <>
      <div className={classes.nav}>
        {Links.map((link) => (
          <NavLink
            key={link.url}
            className={({ isActive }) =>
              isActive
                ? [classes["link"], classes.active].join(" ")
                : classes["link"]
            }
            to={link.url}
            end={link.end}
            onClick={() => setActiveLink(link.text)}
          >
            <span>{active === link.text ? link.icon[1] : link.icon[0]}</span>

            <p>{link.text}</p>
            {/* <span className={`${classes["text"]}`}>{link.text}</span> */}
          </NavLink>
        ))}
      </div>
      <button className={classes["add-btn"]}>
        <span>
          <motion.svg
          className={classes['add-icon']}
            whileTap={{ scale: 1.2 }}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              fill="var(--surface-1)"
              d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"
            />
          </motion.svg>
          {/* <motion.svg
            version="1.1"
            width="263.59375"
            height="380"
            viewBox="0,0,263.59375,380"
            className={classes["squircle"]}
          >
            <g
              fill="var(--text-2)"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <path
                transform="translate(-142.77995,-205.83333) scale(2.08333,2.08333)"
                d="M124.29688,250c-35,0 -52.5,-17.5 -52.5,-52.5v-15c0,-35 17.5,-52.5 52.5,-52.5h15c35,0 52.5,17.5 52.5,52.5v15c0,35 -17.5,52.5 -52.5,52.5z"
              />
            </g>
          </motion.svg> */}
        </span>
      </button>
    </>
  );
};

export default BottomNavigation;
