import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const ProtectedRoute = ({ element }) => {
  const userDetailsObj = useRouteLoaderData("userDetails");
  
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetailsObj) {
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, []);

  return element;
};

export default ProtectedRoute;
