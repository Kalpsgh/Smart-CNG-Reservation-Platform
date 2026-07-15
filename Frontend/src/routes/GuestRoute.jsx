import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return children;

  if (user.role === "owner") {
    return <Navigate to="/ownerDashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/adminDashboard" replace />;
  }

  return <Navigate to="/" replace />;
}