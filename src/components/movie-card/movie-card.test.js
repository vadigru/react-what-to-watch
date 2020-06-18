import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  title: `Matrix`,
  posterUrl: `https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg`,
};

it(`Should render MovieCard component`, () => {
  const tree = renderer
    .create(
        <MovieCard
          movie={movie}
          onMovieTitleClick={() => {}}
          onMovieCardHover={() => {}}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
