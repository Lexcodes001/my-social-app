import {
  useNavigate,
  useRouteLoaderData,
  Await,
  useNavigation,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader"; // Import your loader component

const ProtectedRoute = ({ element }) => {
  const userDetailsObj = useRouteLoaderData("userDetails");
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    const isAuthenticated = userDetailsObj && userDetailsObj !== null;
    alert(isAuthenticated);

    // Check the current location
    const currentPath = window.location.pathname;

    // If the user is not authenticated and currently on the root path
    if (!isAuthenticated) {
      // Redirect to the login page
      navigate("/auth/login");
    } else if (isAuthenticated) {
      // If the user is authenticated and currently on the login page
      // Redirect to the root path
      navigate("/");
    }
  }, [userDetailsObj, navigate]);

  // If userDetailsObj is not available, show a loading state or a fallback component
  if (navigation.state === "loading") {
    return <Loader style="spinner" />;
  } else {
    return element;
  }

  return { element };
};

export default ProtectedRoute;
