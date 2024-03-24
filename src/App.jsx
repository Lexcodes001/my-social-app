import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import Root from "./pages/Root/Root";
import Login, { action as loginAction } from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import Notifications from "./pages/Notifications/Notifications";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import ErrorPage from "./pages/Error/Error";
import Home, { loader as userDetailsLoader } from "./components/Home/Home";
import ProtectedRoute from "./components/Actions/ProtectedRoute";
import Auth from "./pages/Auth/Auth";
import Reset, { action as resetAction } from "./pages/Auth/Reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        path: "",
        id: "userDetails",
        element: <ProtectedRoute isAuth={false} element={<Home />} />,
        loader: userDetailsLoader,
        children: [
          {
            path: "",
            element: <NewsFeed />,
          },
          {
            path: "messenger",
            element: <Messenger />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "profile/:user",
            element: <Profile />,
          },
          // {
          //   path: "logout",
          //   action: logoutAction,
          // },
        ],
      },
      {
        path: "auth",
        element: <ProtectedRoute isAuth={true} element={<Auth />} />,
        children: [
          {
            path: "login",
            element: <Login />,
            action: loginAction,
          },
          {
            path: "signup",
            element: <Register />,
          },
          {
            path: "reset",
            element: <Reset />,
            action: resetAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
