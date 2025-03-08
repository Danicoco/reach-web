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
    icon: (fill: string) => <Home fill={fill} />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Home",
    link: "/dashboard",
  },
  {
    icon: (fill: string) => <Search fill={fill} />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Search",
    link: "/explore",
  },
  {
    icon: (_fill: string) => <PlusCircle color="#fff" fill="#2E0173" size={35} />,
    fillColor: "#2E0173",
    color: "#2E0173",
    name: "",
    link: "",
  },
  {
    icon: (fill: string) => <Bell fill={fill} />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Notification",
    link: "/notifications",
  },
  {
    icon: (fill: string) => <User fill={fill} />,
    fillColor: "#6601FF",
    color: "#000",
    name: "Profile",
    link: "/profile",
  },
];