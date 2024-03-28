import {
  useNavigate,
  useRouteLoaderData,
  Await,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";

const ProtectedRoute = ({ element }) => {
  const userDetailsObj = useRouteLoaderData("userDetails");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRouteChange = () => {
      const isAuthenticated = userDetailsObj && userDetailsObj !== null;

      if (!isAuthenticated) {
        navigate("/auth/login");
      } else {
        navigate("/");
        setIsLoading(false);
      }
    };

    handleRouteChange();
  }, []);

  if (isLoading || navigation.state === "loading") {
    return <Loader style="spinner" />;
  }

  return element;
};

export default ProtectedRoute;
