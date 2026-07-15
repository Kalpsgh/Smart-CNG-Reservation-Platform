import {
  LayoutDashboard,
  Fuel,
  CalendarDays,
  MapPinned,
  Bell,
  BarChart3,
  Users,
  Settings,
  Info,
  Phone,
  Briefcase,
  Home,
  Camera
} from "lucide-react";

const sidebarData = [
  // --- Public Pages (Visible to everyone) ---
  { title: "Home", icon: Home, path: "/", roles: ["user", "guest"] },
  { title: "Admin Dashboard", icon: LayoutDashboard, path: "/admin-dashboard", roles: ["admin"] },
  { title: "Dashboard", icon: LayoutDashboard, path: "/userDashboard", roles: ["user"] },

  { title: "Book CNG Slot", icon: Fuel, path: "/bookingPage", roles: ["user"] },
  { title: "Station Map", icon: MapPinned, path: "/findNearbyCNG", roles: ["user","guest"] },
  { title: "My Bookings", icon: CalendarDays, path: "/userBookings", roles: ["user"], badge: 12 },
  
  { title: "User Management", icon: Users, path: "/userManagement", roles: ["admin"] },

  // --- Pump Owner Pages ---
  { title: "Owner Dashboard", icon: Briefcase, path: "/ownerDashboard", roles: ["owner"] },
  { title: "Manage Pump", icon: Fuel, path: "/managePump", roles: ["owner"] },
  { title: "QR Scanner", icon: Camera, path: "/scanQR", roles: ["owner"] },
  { title: "Pump Bookings", icon: CalendarDays, path: "/pumpBookings", roles: ["owner"] },

  { title: "About Us", icon: Info, path: "/about", roles: ["user", "owner", "admin", "guest"] },
  { title: "Contact Us", icon: Phone, path: "/contact", roles: ["user", "owner", "admin", "guest"] },

  // --- User Pages ---


  // --- Admin Pages ---

  // --- Shared Settings ---
  { title: "Notifications", icon: Bell, path: "/notifications", roles: ["user", "owner", "admin"], badge: 4 },
  { title: "Settings", icon: Settings, path: "/settings", roles: ["user", "owner", "admin"] },
];



export default sidebarData;