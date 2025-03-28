import { addDays } from "date-fns";
import { io } from "socket.io-client";
import axios, { AxiosError } from "axios";

export const instance = (
  baseURL = import.meta.env.VITE_BACKEND_URL,
  stream = false
) => {
  const token = localStorage.getItem("access");
  const base = axios.create({
    baseURL,
    timeout: 1500000,
    ...(stream && { responseType: "stream" }),
    headers: {
      "Content-Type": "application/json",
      // withCredentials: true,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  const methods = ["post", "patch", "put"];

  !stream &&
    base.interceptors.response.use((config) => {
      if (methods.includes(config.config.method as string)) {
        if (config.data) {
          if (config.data?.meta?.token) {
            localStorage.setItem("access", config.data?.meta?.token);
            localStorage.setItem(
              "access-endTime",
              addDays(new Date(), 7).toISOString()
            );
          }
        }
      }
      return config;
    });

  return base;
};

export const next = (e: AxiosError<{ message: string }>) => {
  console.log(e);
  throw new Error(
    e.response?.data ? e.response.data.message : "Something went wrong"
  );
};

export const socketInstance = () => {
  //const token = localStorage.getItem("access");
  return io(`${import.meta.env.VITE_AI_URL}`, {
    autoConnect: false,
    path: "/chat",
    // extraHeaders: {
    //   ...(token && { token }),
    // },
  });
};
