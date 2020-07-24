import {extend} from "../../utils/common.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const SERVER_URL = `https://4.react.pages.academy`;

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isValidAuthorization: true,
  avatarUrl: ``,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  IS_INVALID_AUTHORIZATION: `IS_INVALID_AUTHORIZATION`,
  SET_AVATAR_URL: `SET_AVATAR_URL`
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
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
    .then((response) => {
      const {avatar_url: avatar} = response.data;
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setAvatarUrl(avatar));
    })
    .catch((err) => {
      throw err;
    });
  },

  login: (authData) => (dispatch, getState, api) => {
    // dispatch(ActionCreator.requireValidAuthorization(true));
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password
    })
    .then((response) => {
      const {avatar_url: avatar} = response.data;
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setAvatarUrl(avatar));
    })
    .catch((err)=>{
      dispatch(ActionCreator.requireValidAuthorization(false));
      throw err;
    });
  }
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
