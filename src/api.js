import axios from "axios";

const TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  return api;
};


