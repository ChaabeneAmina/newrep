import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, element }) {
  if (!isAuthenticated) return <Navigate to="/login" />;
  return element;
}

export default ProtectedRoute;
