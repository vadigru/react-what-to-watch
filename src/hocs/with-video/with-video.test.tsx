import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withVideo from "./with-video";
import VideoPlayer from "../../components/video-player/video-player";

import {AuthorizationStatus} from "../../reducer/user/user";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";
import Namespace from "../../reducer/namespace";
import {Movie} from "../../prop-types/types";
import {noop} from "../../utils/common";

const mockStore = configureStore([]);

const movie: Movie = {
  title: `Movie Name`,
  posterUrl: `https://url.com`,
  backgroundUrl: `https://url.com`,
  backgroundColor: `some color`,
  previewUrl: `https://url.com`,
  previewImage: `https://url.com`,
  genre: `genre`,
  release: 2020,
  director: `Famous Director`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 30m`,
  rating: 10,
  votes: 1000000,
  description: `Some Description`,
  id: 1,
  isFavorite: true,
  videoUrl: `https://url.com`,
};

const MockComponentWrapped = withVideo(VideoPlayer);

it(`render withPlayer`, () => {

  const store = mockStore({
    [Namespace.DATA]: {
      films: [],
      promo: movie,
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
          onMouseEnter={noop}
          onMouseLeave={noop}
          isPlaying={false}
        />
      </Provider>
      , {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
