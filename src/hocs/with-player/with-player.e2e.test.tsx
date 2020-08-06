import * as React from "react";
import {Provider} from "react-redux";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import VideoPlayerBig from "../../components/video-player-big/video-player-big";
import withPlayer from "./with-player";

import Namespace from "../../reducer/namespace";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";
import {Movie} from "../../prop-types/types";
import {noop} from "../../utils/common";

const mockStore = configureStore([]);

configure({
  adapter: new Adapter()
});

const VideoPlayerBigWrapped = withPlayer(VideoPlayerBig);

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

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

it(`Checks onFullscreenButtonClick callback `, () => {
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
    },
  });

  const wrapper = mount(
      <Provider store={store}>
        <VideoPlayerBigWrapped
          ref={React.createRef()}
          activeFilm={movie}
          onExitButtonClick={noop}
          autoPlay={true}
        />
      </Provider>
  );

  const {videoRef} = wrapper.find(`WithPlayer`).instance();
  videoRef.current = {requestFullscreen() {
    void 0;
  }};
  const spy = jest.spyOn(videoRef.current, `requestFullscreen`);
  wrapper.find(`WithPlayer`).children().props().onFullscreenButtonClick();

  expect(spy).toHaveBeenCalledTimes(1);
});

it(`Checks video play `, () => {
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
    },
  });

  const wrapper = mount(
      <Provider store={store}>
        <VideoPlayerBigWrapped
          ref={React.createRef()}
          activeMovie={movie}
          onExitButtonClick={noop}
          autoPlay={true}
        />
      </Provider>
  );

  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  const {videoRef} = wrapper.find(`WithPlayer`).instance();
  const spy = jest.spyOn(videoRef.current, `play`);
  wrapper.find(`WithPlayer`).children().props().onPlayButtonClick();
  wrapper.find(`WithPlayer`).children().props().onPlayButtonClick();

  expect(wrapper.find(`WithPlayer`).state().isPlaying).toBeTruthy();
  expect(spy).toHaveBeenCalledTimes(2);
});
