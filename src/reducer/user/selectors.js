import Namespace from "../namespace.js";

export const getAuthorizationStatus = (state) => {
  return state[Namespace.USER].authorizationStatus;
};
