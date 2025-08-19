import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const userToken = localStorage.getItem("adminToken");

  if (!userToken) {
    return <Navigate to={redirectTo} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
