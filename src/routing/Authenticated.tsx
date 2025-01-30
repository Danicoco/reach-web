import { isAfter } from "date-fns";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Authenticated = () => {
  const location = useLocation();
  const token = localStorage.getItem("access");
  const endTime = localStorage.getItem("access-endTime");
  const dayDiff = endTime ? isAfter(new Date(endTime as string), new Date()) : null;

  return token && dayDiff ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Authenticated;
