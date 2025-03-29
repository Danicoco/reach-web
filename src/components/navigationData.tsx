import { User, Bell, Search, Home, PlusCircle } from "react-feather";

export const navigationData = [
  {
    icon: <Home />,
    name: "Home",
    link: "/dashboard",
  },
  {
    icon: <Search />,
    name: "Search",
    link: "/explore",
  },
  {
    icon: <Bell />,
    name: "Notification",
    link: "/notifications",
  },
  {
    icon: <User />,
    name: "Profile",
    link: "/profile",
  },
];

export const mobileNavigationData = [
  {
    icon: () => <Home className="dark:text-[#6601FF]" />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Home",
    link: "/dashboard",
  },
  {
    icon: () => <Search className="dark:text-[#6601FF]" />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Search",
    link: "/explore",
  },
  {
    icon: () => <PlusCircle color="#fff" fill="#2E0173" size={35} />,
    fillColor: "#2E0173",
    color: "#2E0173",
    name: "",
    link: "",
  },
  {
    icon: () => <Bell className="dark:text-[#6601FF]" />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Notification",
    link: "/notifications",
  },
  {
    icon: () => <User className="dark:text-[#6601FF]" />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Profile",
    link: "/profile",
  },
];