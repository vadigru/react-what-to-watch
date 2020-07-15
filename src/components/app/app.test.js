import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

const films = [
  {
    title: `Movie title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie description`,
    reviews: [
      {
        date: `June 25, 2020`,
        user: `John Doe`,
        comment: `Comment text.`,
        rating: 8.9
      },
    ]
  }
];

const movie = {
  title: `Movie title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor 1`, `Actor 2`, `Actor 3`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie description`,
  reviews: [
    {
      date: `June 25, 2020`,
      user: `John Doe`,
      comment: `Comment text.`,
      rating: 8.9
    },
  ]
};

it(`Should render App component`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      films,
      promoFilm: films[0]
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: MOVIES_DEFAULT_AMOUNT
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            activeMovieCard={movie}
            onMovieCardClick={() => {}}
            isBigPlayerActive={false}
            onBigPlayerOnOff={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
