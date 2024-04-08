import React, { useEffect, useState } from "react";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import { useLocation } from "react-router-dom";

const Navigation = ({ user }) => {
  const location = useLocation();

  const generatePageName = (str) => {
    const firstLetter = str[0];
    const remainingString = str.slice(1, 5);
    if (remainingString === "auth") {
      return "auth";
    } else {
      return "home";
    }
  };

  const pathname = location.pathname;
  const page = generatePageName(pathname);

  useEffect(() => {
    // You can add any side effects here if needed
  }, []);

  return (
    <>{page === "auth" ? <AuthNavigation /> : <MainNavigation user={user} />}</>
  );
};

export default Navigation;