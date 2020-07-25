import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import Namespace from "../../reducer/namespace.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

it(`Should render UserBlock component`, () => {
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
    },
  });

  const onSignInClick = jest.fn();

  const tree = renderer
    .create(
        <Provider store={store}>
          <UserBlock
            avatarUrl={``}
            onSignInClick={onSignInClick}
            authorizationStatus={true}
          />
        </Provider>
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
