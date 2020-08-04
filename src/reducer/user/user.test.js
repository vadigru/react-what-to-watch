
import {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation} from "./user";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    isValidAuthorization: true,
    avatarUrl: ``,
    isSignIn: false
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    isValidAuthorization: false,
  }, {
    type: ActionType.IS_INVALID_AUTHORIZATION,
    payload: true,
  })).toEqual({
    isValidAuthorization: true,
  });
  expect(reducer({
    isValidAuthorization: true,
  }, {
    type: ActionType.IS_INVALID_AUTHORIZATION,
    payload: false,
  })).toEqual({
    isValidAuthorization: false,
  });

  expect(reducer({
    avatarUrl: ``,
  }, {
    type: ActionType.SET_AVATAR_URL,
    payload: `/img/1.png`,
  })).toEqual({
    avatarUrl: `https://4.react.pages.academy/img/1.png`,
  });

  expect(reducer({
    isSignIn: true,
  }, {
    type: ActionType.IS_SIGNE_IN,
    payload: true,
  })).toEqual({
    isSignIn: true,
  });
});


it(`Action creator for require authorization returns correct action`, () => {
  expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  });
  expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  });
});

it(`Action creator for invalid authorization `, () => {
  expect(ActionCreator. requireValidAuthorization(true)).toEqual({
    type: ActionType.IS_INVALID_AUTHORIZATION,
    payload: true,
  });
  expect(ActionCreator. requireValidAuthorization(false)).toEqual({
    type: ActionType.IS_INVALID_AUTHORIZATION,
    payload: false,
  });
});

it(`Action creator for avatar `, () => {
  expect(ActionCreator. setAvatarUrl(``)).toEqual({
    type: ActionType.SET_AVATAR_URL,
    payload: ``,
  });
});

it(`Should make a correct API call to /login`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const authChecker = Operation.checkAuth();

  apiMock.onGet(`/login`).reply(200, {});

  return authChecker(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });
});

it(`Should make a incorrect API call to /login`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const authChecker = Operation.checkAuth();

  apiMock.onGet(`/login`).reply(401);

  return authChecker(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    });
  })
  .catch(() => {
    expect(dispatch).toHaveBeenCalledTimes(0);
  }
  );
});

it(`Operation correct login`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const authData = {
    email: `test@mail.com`,
    password: `test`
  };
  const login = Operation.login(authData);

  apiMock.onPost(`/login`).reply(200, {});

  return login(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

it(`Operation incorrect login`, () => {
  const authData = {
    email: `test@mail.com`,
    password: `test`
  };

  const apiMock = new MockAdapter(api);
  apiMock.onPost(`/login`).reply(401, {});

  const dispatch = jest.fn();
  const login = Operation.login(authData);

  return login(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(0);
  })
  .catch(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
