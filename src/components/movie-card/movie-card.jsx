import React from "react";
import PropTypes from "prop-types";
import {movieType} from "../../prop-types/types.js";
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = (props) => {
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

MovieCard.propTypes = {
  movie: movieType.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default MovieCard;
