import axios from "axios";
import {AppRoute} from "./const.js";
import history from "./history.js";


const TIMEOUT = 5000;
const LOGIN_URL = `https://4.react.pages.academy/wtw/login`;
const Error = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/wtw`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    const {response, request} = err;
    switch (response.status) {
      case Error.UNAUTHORIZED:
        onUnauthorized(response);
        if (request.responseURL !== LOGIN_URL) {
          history.push(AppRoute.SIGN_IN);
        }
        throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
