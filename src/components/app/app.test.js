import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const FilmData = {
  TITLE: `Joker`,
  GENRE: `Drama`,
  YEAR: 2019
};

const MOVIES = [`The Shawshank Redemption`, `Forrest Gump`, `The Intouchables`];

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          title = {FilmData.TITLE}
          genre = {FilmData.GENRE}
          year = {FilmData.YEAR}
          movies= {MOVIES}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
