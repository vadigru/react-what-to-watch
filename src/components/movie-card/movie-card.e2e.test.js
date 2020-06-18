import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Matrix`,
  posterUrl: `https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg`,
};

it(`Should pass data to the handler when hovering over a MoviCard`, () => {
  const handleMovieCardHover = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieTitleClick={() => {}}
        onMovieCardHover={() => handleMovieCardHover(movie)}
      />
  );

  movieCard.simulate(`mouseOver`);

  expect(handleMovieCardHover.mock.calls.length).toBe(1);
  expect(handleMovieCardHover.mock.calls[0][0]).toMatchObject(movie);
});
