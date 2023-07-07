import axios from "axios";
import { toast } from "react-toastify";

let showToast = false;
export const baseURL = "https://service.talebi-narm.ir/api/";
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : null,
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("errrrrorrr", error.response.data);

    if (typeof error.response === "undefined") {
      console.log(
        "A server/network error occurred. handelt here " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      // Redirect to login page if user is not logged in
      if (!showToast) {
        toast.error("You're not loged in :( you're redirecting to login page.");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        showToast = true;
      }
      setTimeout(() => {
        window.location.href = "/signin";
        return Promise.reject(error);
      }, 5000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
