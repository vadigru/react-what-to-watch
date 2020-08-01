import * as React from "react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import SignIn from "./sign-in";

import {AuthorizationStatus} from "../../reducer/user/user";
import Namespace from "../../reducer/namespace";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";

import history from "../../history";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const UserData = {
  login: ``,
  password: ``
};

const preventEvent = {
  preventDefault() {}
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
      selectedMovieId: 0
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isValidAuthorization: true,
      avatarUrl: ``,
      isSignIn: false,
    },
  });

  const handleSubmit = jest.fn(() => {});

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

  form.simulate(`submit`, preventEvent);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(UserData);
});
