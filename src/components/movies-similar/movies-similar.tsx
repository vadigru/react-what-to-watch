import * as React from "react";
// import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list";

import {Movie} from "../../prop-types/types";

interface Props {
  movies: Movie[];
  movie: Movie;
  onMovieCardClick: (id: number) => void;
};

const getSimilarMovies = (movies, movie) => {
  return movies.filter((similarMovie) =>
    similarMovie.genre === movie.genre && similarMovie.title !== movie.title).slice(0, 4);
};

const MoviesSimilar: React.FunctionComponent<Props> = (props) => {
  const {movies, movie, onMovieCardClick} = props;

  return (
    <MoviesList
      movies={getSimilarMovies(movies, movie)}
      onMovieCardClick={onMovieCardClick}
    />
  );
};

// MoviesSimilar.propTypes = {
//   movies: PropTypes.arrayOf(movieType).isRequired,
//   movie: movieType.isRequired,
//   onMovieCardClick: PropTypes.func.isRequired
// };

export default React.memo(MoviesSimilar);
