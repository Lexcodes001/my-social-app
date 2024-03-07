import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(JSON.stringify(currentUser));
  useEffect(() => {
    if (
      currentUser ||
      JSON.stringify(currentUser) !== 'false'
    ) {
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, [currentUser]);

  return element;
};

export default ProtectedRoute;
