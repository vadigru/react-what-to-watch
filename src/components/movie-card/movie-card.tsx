import * as React from "react";

import VideoPlayer from "../video-player/video-player";

import {Movie} from "../../prop-types/types";

interface Props {
  movie: Movie;
  onMovieCardClick: () => void;
  onMouseEnter: (movie: Movie) => void;
  onMouseLeave: () => void;
  isPlaying: boolean;
}

const MovieCard: React.FunctionComponent<Props> = (props: Props) => {
  const {isPlaying, onMouseEnter, onMouseLeave} = props;
  const {movie, onMovieCardClick} = props;
  const {title, previewUrl, previewImage} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onMouseEnter(movie)}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="small-movie-card__image"
        onClick={onMovieCardClick}
      >
        {!isPlaying && (
          <img
            src={previewImage}
            alt={title}
            width="280"
            height="175"
          />
        )}
        {isPlaying && (
          <VideoPlayer
            isPlaying={isPlaying}
            src={previewUrl}
            autoPlay={true}
          />
        )}

      </div>
      <h3
        className="small-movie-card__title"
        onClick={(evt) => {
          evt.preventDefault();
          onMovieCardClick();
        }}
      >
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

export default MovieCard;
