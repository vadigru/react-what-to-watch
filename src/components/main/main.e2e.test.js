import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const films = [
  {
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
  },
  {
    title: `Movie Name`,
    posterUrl: `https://url.com`,
    backgroundUrl: `https://url.com`,
    backgroundColor: `some color`,
    previewUrl: `https://url.com`,
    previewImage: `https://url.com`,
    genre: `genre 1`,
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
  },
  {
    title: `Movie Name`,
    posterUrl: `https://url.com`,
    backgroundUrl: `https://url.com`,
    backgroundColor: `some color`,
    previewUrl: `https://url.com`,
    previewImage: `https://url.com`,
    genre: `genre 2`,
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
  },
  {
    title: `Movie Name`,
    posterUrl: `https://url.com`,
    backgroundUrl: `https://url.com`,
    backgroundColor: `some color`,
    previewUrl: `https://url.com`,
    previewImage: `https://url.com`,
    genre: `genre 3`,
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
  },
];

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

const preventEvent = {
  preventDefault() {}
};

it(`Should movie card be pressed`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      films,
      promo: movie
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: MOVIES_DEFAULT_AMOUNT
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    },
  });

  const handleMovieCardClick = jest.fn(() => () => {});

  const main = mount(
      <Provider store={store}>
        <Main
          onMovieCardClick={() => handleMovieCardClick}
          isBigPlayerActive={false}
          onBigPlayerOnOff={() => {}}
          onSignInClickHandler={() => {}}
        />
      </Provider>
  );

  const movieImages = main.find(`div.small-movie-card__image`);
  const movieTitles = main.find(`h3.small-movie-card__title`);

  movieImages.forEach((mov) => mov.props().onClick());
  movieTitles.forEach((tit) => tit.props().onClick(preventEvent));

  expect(handleMovieCardClick).toHaveBeenCalledTimes(movieImages.length + movieTitles.length);
});

it(`Should call handler on button click`, () => {
  const handleShowMoreButtonClick = jest.fn();

  const showMoreButton = mount(
      <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick}/>
  );

  showMoreButton.find(`button.catalog__button`).simulate(`click`);

  expect(handleShowMoreButtonClick.mock.calls.length).toBe(1);
});
