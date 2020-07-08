import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";

const mockStore = configureStore([]);

const FilmData = {
  TITLE: `Joker`,
  GENRE: `Drama`,
  YEAR: 2019
};

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
  }
];

it(`Should render Main component`, () => {
  const store = mockStore({
    genre: ALL_GENRES,
    films,
    showedMovies: MOVIES_DEFAULT_AMOUNT
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            promoTitle={FilmData.TITLE}
            promoGenre={FilmData.GENRE}
            promoYear={FilmData.YEAR}
            movies={films}
            onMovieCardClick={() => () => {}}
          />
        </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
