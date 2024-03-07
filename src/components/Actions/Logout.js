import { redirect, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

export function action() {
  const auth = getAuth();
  const navigate = useNavigate();
  signOut(auth)
    .then(() => {
      // Sign-out successful
      console.log("User signed out");
      navigate("/auth/login");
    })
    .catch((error) => {
      throw json({title: error.name}, { message: error.code }, { status: 500 });
    });
}