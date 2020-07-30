import Namespace from "../namespace.js";

export const getAuthorizationStatus = (state) => {
  return state[Namespace.USER].authorizationStatus;
};

export const getInvalidAuthorizationStatus = (state) => {
  return state[Namespace.USER].isValidAuthorization;
};

export const getAvatar = (state) => {
  return state[Namespace.USER].avatarUrl;
};

export const getSignInFlag = (state) => {
  return state[Namespace.USER].isSignIn;
};
