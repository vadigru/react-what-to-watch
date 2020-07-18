import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

const films = [
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor One`, `Actor Two`, `Actor Three`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie Description`,
    reviews: [
      {
        date: `June 25, 2020`,
        user: `John Doe`,
        comment: `Comment text.`,
        rating: 8.9
      },
    ]
  },
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor One`, `Actor Two`, `Actor Three`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie Description`,
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
  title: `Movie Title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie Description`,
  reviews: [
    {
      date: `June 25, 2020`,
      user: `John Doe`,
      comment: `Comment text.`,
      rating: 8.9
    },
  ]
};


it(`Should render MoviePage component`, () => {
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
          <MoviePage
            movies={films}
            movie={movie}
            onMovieCardClick={() => {}}
            activeTab={`Overview`}
            onTabClick={() => {}}
            isBigPlayerActive={false}
            onBigPlayerOnOff={() => {}}
          />
        </Provider>
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
