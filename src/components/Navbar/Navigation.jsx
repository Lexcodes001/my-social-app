import { useRouteLoaderData } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";

const Navigation = ({user}) => {
  return <>{user ? <MainNavigation user={user} /> : <AuthNavigation user={user} />}</>;
};

export default Navigation;
