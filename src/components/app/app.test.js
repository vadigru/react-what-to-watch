import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const FilmData = {
  TITLE: `Joker`,
  GENRE: `Drama`,
  YEAR: 2019
};

const films = [
  {
    title: `Movie title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie description`
  }
];

it(`Should render App component`, () => {
  const tree = renderer
    .create(
        <App
          title = {FilmData.TITLE}
          genre = {FilmData.GENRE}
          year = {FilmData.YEAR}
          movies= {films}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
