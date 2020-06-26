import React from "react";
import PropTypes from "prop-types";
import movieType from "../../prop-types/types.js";
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = (props) => {
  const {movie, onMovieCardClick, onMovieCardMouseEnter, onMovieCardMouseLeave, isPlaying} = props;
  const {title, posterUrl, previewUrl} = movie;
  console.log(`render`);
  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMovieCardMouseEnter}
      onMouseLeave={onMovieCardMouseLeave}
    >
      <div
        className="small-movie-card__image"
        onClick={onMovieCardClick}
      >
        {!isPlaying && (
          <img
            src={posterUrl}
            alt={title}
            width="280"
            height="175"
          />
        )}
        {isPlaying && (
          <VideoPlayer
            preview={previewUrl}
            autoplay={true}
            mute={true}
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
  onMovieCardMouseEnter: PropTypes.func.isRequired,
  onMovieCardMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default MovieCard;
