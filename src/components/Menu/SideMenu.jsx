import classes from "./SideMenu.module.css";
import { motion } from "framer-motion";

const SideMenu = ({ isOpen, setIsOpen, children }) => {

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
          transition: {
            type: "tween",
            when: "beforeChildren",
            staggerChildren: 1,
          },
        }}
        exit={{
          opacity: 0,
          x: -30,
          transition: {
            type: "tween",
            when: "afterChildren",
            staggerChildren: 1,
          },
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
          className={`${classes["items"]}`}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideMenu;
