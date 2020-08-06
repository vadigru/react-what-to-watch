import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withPlayer from "./with-player";
import VideoPlayerBig from "../../components/video-player-big/video-player-big";

import {AuthorizationStatus} from "../../reducer/user/user";

import {noop} from "../../utils/common";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";
import Namespace from "../../reducer/namespace";

const mockStore = configureStore([]);

const MockComponentWrapped = withPlayer(VideoPlayerBig);

it(`render withPlayer`, () => {

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
      isSignIn: false
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <MockComponentWrapped
          autoPlay={false}
          onExitButtonClick={noop}
        />
      </Provider>
      , {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
