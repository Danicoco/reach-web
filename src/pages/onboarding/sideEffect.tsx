import { isAfter } from "date-fns";
import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

export const ProcessDefaults = (navigate: NavigateFunction) => {
  useEffect(() => {
    const token = localStorage.getItem("access");
    const endTime = localStorage.getItem("access-endTime");
    const dayDiff = isAfter(new Date(endTime as string), new Date());
    if (!endTime) {
      localStorage.clear();
      return;
    }
    if (endTime && !dayDiff) {
      localStorage.clear();
      return;
    } else {
      if (token) navigate("/dashboard");
    }
  }, [navigate]);
};
