import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../Navbar/Navigation";
import classes from './Home.module.css';
import Popup from "../UI/SettingsPopup/Popup";

const Home = () => {
  return (
    <>
      <Navigation />
      <Popup />
      <motion.div className={classes["page"]}>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Home;