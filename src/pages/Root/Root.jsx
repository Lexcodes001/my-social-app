import { Outlet, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { AlertContext } from "../../context/AlertContext";
export const LogoutContext = createContext();

const Root = () => {
  const navigate = useNavigate();
  const { alertObjState, dispatchAction } = useContext(AlertContext);
  const logoutAction = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/auth/login");

        dispatchAction(
          "login_status",
          "dynamic",
          "success",
          "Successfully logged out"
        );
      })
      .catch((error) => {
        throw json(
          { title: error.name },
          { message: error.code },
          { status: 500 }
        );
      });
  };
  return (
    <>
      <LogoutContext.Provider value={logoutAction}>
        <Outlet />
      </LogoutContext.Provider>
    </>
  );
};

export default Root;
