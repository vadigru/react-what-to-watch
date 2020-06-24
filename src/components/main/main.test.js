import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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
    description: `Movie Description`
  }
];

it(`Should render Main component`, () => {
  const tree = renderer
    .create(
        <Main
          title={FilmData.TITLE}
          genre={FilmData.GENRE}
          year={FilmData.YEAR}
          movies={films}
          onMovieCardClick={() => () => {}}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
