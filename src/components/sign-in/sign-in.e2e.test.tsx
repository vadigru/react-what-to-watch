import * as React from "react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import SignIn from "./sign-in";

import {AuthorizationStatus} from "../../reducer/user/user";
import Namespace from "../../reducer/namespace";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";
import history from "../../history";
import {noop} from "../../utils/common";

const mockStore = configureStore([]);

configure({
  adapter: new Adapter(),
});

const UserData = {
  login: ``,
  password: ``
};

it(`Should submit a form`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      films: [],
      promo: {},
      reviews: [],
      isFilmsLoading: false,
      isPromoLoading: false,
      isReviewsLoading: false,
      isReviewPosting: false,
      isReviewSendingError: false,
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: MOVIES_DEFAULT_AMOUNT,
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isValidAuthorization: true,
      avatarUrl: ``,
      isSignIn: false,
    },
  });

  const handleSubmit = jest.fn(noop);

  const signIn = mount(
      <Provider store={store}>
        <Router history={history}>
          <SignIn
            isValid={true}
            onSubmit={handleSubmit}
          />
        </Router>
      </Provider>

  );

  const form = signIn.find(`.sign-in__form`);

  form.simulate(`submit`, noop);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(UserData);
});
