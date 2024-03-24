import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../components/UI/Loader/Loader";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const isOnline = useOnlineStatus();

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
      } else return false;
    } catch (error) {
      console.table(error);
      throw json(
        // { error: error },
        { message: error.message },
        { status: 500 }
      );
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (isOnline) {
        if (user) {
          const result = await getMemberData(user.uid);
          setCurrentUserRole(result[0]);
          setCurrentUser(user);
          setCurrentUserDetails(result[1]);
          console.log(result[1]);
        } else {
          setCurrentUser(false);
          setCurrentUserDetails({});
        }
        setLoading(false); // Update loading state once data fetching is complete
      }
    });

    return () => {
      unsub();
    };
  }, [isOnline]);

  return (
    <AuthContext.Provider
      value={{ currentUser, currentUserRole, currentUserDetails, loading }}
    >
      {!loading ? <Loader style="overlay" /> : children}
    </AuthContext.Provider>
  );
};
