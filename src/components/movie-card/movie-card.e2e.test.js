import * as React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Movie Name`,
  posterUrl: `https://url.com`,
  backgroundUrl: `https://url.com`,
  backgroundColor: `some color`,
  previewUrl: `https://url.com`,
  previewImage: `https://url.com`,
  genre: `genre`,
  release: 2020,
  director: `Famous Director`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 30m`,
  rating: 10,
  votes: 1000000,
  description: `Some Description`,
  id: 1,
  isFavorite: true,
  videoUrl: `https://url.com`,
};

it(`Should pass data to the handler when hovering over a MoviCard`, () => {
  const handleMovieCardMouseEnter = jest.fn();
  const handleMovieCardMouseLeave = jest.fn();
  const handleMovieCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        onMovieCardClick={handleMovieCardClick}
        onMouseEnter={() => handleMovieCardMouseEnter(movie)}
        onMouseLeave={() => handleMovieCardMouseLeave(movie)}
        isPlaying={true}
      />
  );

  movieCard.simulate(`mouseEnter`);
  movieCard.simulate(`mouseLeave`);

  expect(handleMovieCardMouseEnter.mock.calls.length).toBe(1);
  expect(handleMovieCardMouseEnter.mock.calls[0][0]).toMatchObject(movie);
  expect(handleMovieCardMouseLeave.mock.calls.length).toBe(1);
});
