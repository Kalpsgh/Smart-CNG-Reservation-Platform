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
  Home
} from "lucide-react";

const sidebarData = [
  // Public Pages
  {
    title: "Home",
    icon: Home,
    path: "/",
    public: true,
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    public: false,
  },
  {
    title: "Book CNG",
    icon: Fuel,
    path: "/book",
    public: true,
  },
  {
    title: "Nearby Pumps",
    icon: MapPinned,
    path: "/pumps",
    public: true,
  },
  {
    title: "Services",
    icon: Briefcase,
    path: "/services",
    public: true,
  },
  {
    title: "About Us",
    icon: Info,
    path: "/about",
    public: true,
  },
  {
    title: "Contact Us",
    icon: Phone,
    path: "/contact",
    public: true,
  },

  // Login Required
  {
    title: "My Bookings",
    icon: CalendarDays,
    path: "/bookings",
    badge: 12,
    public: false,
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
    badge: 4,
    public: false,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
    public: false,
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
    public: false,
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    public: false,
  },
];

export default sidebarData;