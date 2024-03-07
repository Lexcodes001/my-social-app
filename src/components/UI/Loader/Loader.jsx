import { motion, AnimatePresence } from "framer-motion";
import LogoImage from "../Logo/Logo";
import classes from "./Loader.module.css";

const Loader = ({style}) => {
  return (
    <AnimatePresence>
      {style === 'overlay' && <motion.div className={classes["loading"]}>
        <motion.div className={classes.overlay}></motion.div>
        <motion.div className={classes["logo"]}>
          <LogoImage />
        </motion.div>
      </motion.div>}
      {style === 'spinner' && <motion.div>
        <div className={classes["lds-ring"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default Loader;
