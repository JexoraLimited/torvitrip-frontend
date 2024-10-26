import axios from "axios";

import { Keys } from "@/config";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const http = axios.create({ baseURL: Keys.API_BASE_URL });

http.interceptors.request.use(
  async (config) => {
    const token = cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default http;
