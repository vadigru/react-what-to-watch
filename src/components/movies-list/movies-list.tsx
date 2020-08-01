import * as React from "react";
// import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card";
import withVideo from "../../hocs/with-video/with-video";

import {Movie} from "../../prop-types/types";

interface Props {
  movies: Movie[];
  onMovieCardClick: (id: number) => void;
};

const MovieCardWithVideo = withVideo(MovieCard);

const MoviesList: React.FunctionComponent<Props> = (props) => {
  const {movies, onMovieCardClick} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, index) => (
        <MovieCardWithVideo
          key={movie.title + index}
          movie={movie}
          onMovieCardClick={onMovieCardClick(movie.id)}
        />
      ))}
    </div>
  );
};

// MoviesList.propTypes = {
//   movies: PropTypes.arrayOf(movieType).isRequired,
//   onMovieCardClick: PropTypes.func.isRequired,
// };

export default MoviesList;
