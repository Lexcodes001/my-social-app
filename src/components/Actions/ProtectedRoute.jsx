import { useNavigate, useRouteLoaderData, Await } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader"; // Import your loader component

const ProtectedRoute = ({ element }) => {
  const userDetailsObj = useRouteLoaderData("userDetails");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = userDetailsObj && userDetailsObj !== null;

    // Check the current location
    const currentPath = window.location.pathname;

    // If the user is not authenticated and currently on the root path
    if (!isAuthenticated && currentPath === "/") {
      // Redirect to the login page
      navigate("/auth/login");
    } else if (isAuthenticated && currentPath === "/auth/login") {
      // If the user is authenticated and currently on the login page
      // Redirect to the root path
      navigate("/");
    }
  }, [userDetailsObj, navigate]);

  // If userDetailsObj is not available, show a loading state or a fallback component
  if (!userDetailsObj) {
    return <Loader />;
  }

  return element;
};

export default ProtectedRoute;