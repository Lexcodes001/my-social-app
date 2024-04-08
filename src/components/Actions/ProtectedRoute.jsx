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
        setIsLoading(false);
        navigate("/auth/");
      } else {
        setIsLoading(false);
        navigate("/");
      }
    };

    handleRouteChange();
  }, []);

  if (isLoading) {
    return <Loader style="spinner" />;
  }

  return element;
};

export default ProtectedRoute;
