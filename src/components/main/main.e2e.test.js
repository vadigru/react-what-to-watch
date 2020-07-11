import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

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

const preventEvent = {
  preventDefault() {}
};

it(`Should movie card be pressed`, () => {
  const store = mockStore({
    genre: ALL_GENRES,
    films,
    showedMovies: MOVIES_DEFAULT_AMOUNT
  });

  const handleMovieCardClick = jest.fn(() => () => {});

  const main = mount(
      <Provider store={store}>
        <Main
          promoTitle={FilmData.TITLE}
          promoGenre={FilmData.GENRE}
          promoYear={FilmData.YEAR}
          movies={films}
          onMovieCardClick={() => handleMovieCardClick}
        />
      </Provider>
  );

  const movieImage = main.find(`div.small-movie-card__image`);
  const movieTitle = main.find(`h3.small-movie-card__title`);
  movieImage.props().onClick();
  movieTitle.props().onClick(preventEvent);
  expect(handleMovieCardClick).toHaveBeenCalledTimes(2);
});

it(`Should call handler on button click`, () => {
  const handleShowMoreButtonClick = jest.fn();

  const showMoreButton = mount(
      <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick}/>
  );

  showMoreButton.find(`button.catalog__button`).simulate(`click`);

  expect(handleShowMoreButtonClick.mock.calls.length).toBe(1);
});
