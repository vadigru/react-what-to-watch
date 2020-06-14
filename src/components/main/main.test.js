import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const FilmData = {
  TITLE: `The Shining `,
  GENRE: `Horror`,
  YEAR: 1980
};

const MOVIES = [`AAliens`, `Avengers: Infinity War`, `L.A. Confidential`];

it(`Should render Main component`, () => {
  const tree = renderer
    .create(
        <Main
          title={FilmData.TITLE}
          genre={FilmData.GENRE}
          year={FilmData.YEAR}
          movies={MOVIES}
          onMovieTitleClick={()=> {}}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
