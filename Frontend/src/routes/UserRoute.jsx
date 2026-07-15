import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Guest cannot access
  if (!user) {
    return children;
  }

  // Owner cannot access user pages
  if (user.role === "owner") {
    return <Navigate to="/ownerDashboard" replace />;
  }

  // Admin cannot access user pages
  if (user.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  // User is allowed
  return children;
}