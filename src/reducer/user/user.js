import {extend} from "../../utils/common.js";
import StoreLocal from "../../local-storage/local-storage";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const SERVER_URL = `https://4.react.pages.academy`;

export const authLocalStorage = new StoreLocal(`AuthorizationStatus`);
export const avatarLocalStorage = new StoreLocal(`AvatarUrl`);


const initialState = {
  authorizationStatus: authLocalStorage.getAll() || AuthorizationStatus.NO_AUTH,
  isValidAuthorization: true,
  avatarUrl: avatarLocalStorage.getAll() || ``,
  isSignIn: false
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  IS_INVALID_AUTHORIZATION: `IS_INVALID_AUTHORIZATION`,
  SET_AVATAR_URL: `SET_AVATAR_URL`,
  IS_SIGNE_IN: `IS_SIGNE_IN`
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status
  }),
  requireValidAuthorization: (isValid) => ({
    type: ActionType.IS_INVALID_AUTHORIZATION,
    payload: isValid
  }),
  setAvatarUrl: (avatarUrl) => ({
    type: ActionType.SET_AVATAR_URL,
    payload: avatarUrl
  }),
  changeSignInFlag: (signInFlag) => ({
    type: ActionType.IS_SIGNE_IN,
    payload: signInFlag
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.IS_INVALID_AUTHORIZATION:
      return extend(state, {
        isValidAuthorization: action.payload
      });
    case ActionType.SET_AVATAR_URL:
      return extend(state, {
        avatarUrl: `${SERVER_URL}${action.payload}`
      });
    case ActionType.IS_SIGNE_IN:
      return extend(state, {
        isSignIn: action.payload
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
    .then((response) => {
      if (response.status === 200) {
        const {avatar_url: avatar} = response.data;
        authLocalStorage.clear();
        authLocalStorage.setItem(`AUTH`);
        avatarLocalStorage.setItem(avatar);
        dispatch(ActionCreator.requireAuthorization(authLocalStorage.getAll()));
        dispatch(ActionCreator.setAvatarUrl(avatarLocalStorage.getAll()));

      } else {
        authLocalStorage.clear();
        authLocalStorage.setItem(`NO_AUTH`);
        dispatch(ActionCreator.requireAuthorization(authLocalStorage.getAll()));
      }

    })
    .catch((err) => {
      throw err;
    });
  },

  login: (authData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.requireValidAuthorization(true));
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password
    })
    .then((response) => {
      const {avatar_url: avatar} = response.data;
      authLocalStorage.clear();
      authLocalStorage.setItem(`AUTH`);
      avatarLocalStorage.setItem(avatar);
      dispatch(ActionCreator.requireAuthorization(authLocalStorage.getAll()));
      dispatch(ActionCreator.requireValidAuthorization(true));
      dispatch(ActionCreator.setAvatarUrl(avatarLocalStorage.getAll()));
    })
    .catch((err)=>{
      dispatch(ActionCreator.requireValidAuthorization(false));
      throw err;
    });
  }
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
