import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movie-details.jsx";

const movie = {
  title: `Movie Title`,
  posterUrl: `https://url.com/poster.jpg`,
  backgroundUrl: `https://url.com/poster/1.jpg`,
  genre: `Movie Genre`,
  release: 2020,
  director: `Director Name`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 00m`,
  rating: 10,
  votes: 1000,
  description: `Movie Description`
};

it(`Should render MovieDetails component`, () => {
  const tree = renderer
    .create(
        <MovieList
          movie={movie}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
