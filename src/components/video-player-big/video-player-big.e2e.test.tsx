import * as React from "react";
import {Provider} from "react-redux";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import VideoPlayerBig from './video-player-big';

import Namespace from "../../reducer/namespace";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";

const mockStore = configureStore([]);

configure({
  adapter: new Adapter()
});

const movie = {
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

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};


it(`Click by Play, Exit and FullScreen button calls callback`, () => {
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
      selectedMovieId: 0
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isValidAuthorization: true,
      avatarUrl: ``,
    },
  });

  const hadleBigPlayerPlay = jest.fn();
  const handleFullscreenButtonClick = jest.fn();
  const handleExitButtonClick = jest.fn();

  const ref = React.createRef();
  const wrapper = mount(
      <Provider store={store}>
        <VideoPlayerBig
          isPlaying={false}
          src={movie.videoUrl}
          autoPlay={false}
          movie={movie}
          onPlayButtonClick={hadleBigPlayerPlay}
          onFullscreenButtonClick={handleFullscreenButtonClick}
          getPlaybackProgress={() => {}}
          getRemainingTime={() => {}}
          videoRef={ref}
          onExitButtonClick={handleExitButtonClick}
          onLoadedMetadata={() => {}}
          onTimeUpdate={() => {}}
          videoUrl={movie.videoUrl}
          id={2}
        />
      </Provider>
  );

  wrapper.find(`.player__play`).simulate(`click`);
  wrapper.find(`.player__full-screen`).simulate(`click`);
  wrapper.find(`.player__exit`).simulate(`click`);

  expect(hadleBigPlayerPlay).toHaveBeenCalledTimes(1);
  expect(handleFullscreenButtonClick).toHaveBeenCalledTimes(1);
  expect(handleExitButtonClick).toHaveBeenCalledTimes(1);
});
