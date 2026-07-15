import { Navigate } from "react-router-dom";

export default function OwnerRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Guest can access
  if (!user) {
    return children;
  }

  // Redirect Owner
  if (user.role === "user") {
    return <Navigate to="/" replace />;
  }

  // Redirect Admin
  if (user.role === "admin") {
    return <Navigate to="/adminDashboard" replace />;
  }

  // Normal User can access
  return children;
}