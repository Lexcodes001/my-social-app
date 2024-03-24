import { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useRouteLoaderData,
  json,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../Navbar/Navigation";
import classes from "./Home.module.css";
import Popup from "../UI/SettingsPopup/Popup";
import Loader from "../UI/Loader/Loader";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

const Home = () => {
  // const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const online = navigator.onLine;
  
  const user = useRouteLoaderData("userDetails");
  useEffect(() => {
    if (!online || isOnline === null || isOnline === false) {
      throw json({ message: "Network Error, can't connect!" }, { status: 200 });
    }
  }, [online, isOnline]);

  return (
    <>
      <Navigation user={user} />
      <motion.div className={classes["page"]}>
        <AnimatePresence>
          {navigation.state === "loading" ? (
            <Loader style="spinner" />
          ) : (
            <Outlet />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Home;

export const loader = async () => {
  try {
    const { user, result } = await getUserDataPromise();
    return json({ user, result });
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw json({ message: error.message }, { status: error.status || 500 });
  }
};

const getMemberData = async (uid) => {
  try {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const adminDocRef = doc(db, "admins", uid);
      const adminDocSnapshot = await getDoc(adminDocRef);

      if (adminDocSnapshot.exists()) {
        const adminData = adminDocSnapshot.data();
        return ["admin", adminData];
      } else if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return ["user", userData];
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw json({ message: error.message }, { status: 500 });
  }
};

const getUserDataPromise = () => {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getMemberData(user.uid);
        if (result) {
          unsub(); // Unsubscribe from the listener
          resolve({ user, result });
        } else {
          reject(new Error("User details not fetched", { status: 500 }));
        }
      } else {
        reject(new Error("User not Authenticated", { status: 500 }));
      }
    });
  });
};
