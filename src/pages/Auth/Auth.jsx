import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navbar/Navigation";

const Auth = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Auth;
