import * as React from "react";

import MovieCard from "../movie-card/movie-card";
import withVideo from "../../hocs/with-video/with-video";

import {Movie} from "../../prop-types/types";

interface Props {
  movies: Movie[];
  onMovieCardClick: ({}) => void;
}

const MovieCardWithVideo = withVideo(MovieCard);

const MoviesList: React.FunctionComponent<Props> = (props: Props) => {
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

export default MoviesList;
