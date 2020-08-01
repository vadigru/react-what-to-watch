import * as React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";

import SignIn from "./sign-in.jsx";

import {AuthorizationStatus} from "../../reducer/user/user.js";
import Namespace from "../../reducer/namespace.js";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import history from "../../history.js";

const mockStore = configureStore([]);

it(`Should render SignIn component`, () => {
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

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <SignIn
              isValid={true}
              onSubmit={() => {}}
            />
          </Router>
        </Provider>
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
