import React from "react";
import PropTypes from "prop-types";
import movieType from "../../prop-types/types.js";

const MovieCard = (props) => {
  const {movie, onMovieCardClick, onMovieCardHover} = props;
  const {title, posterUrl} = movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieCardHover}
    >
      <div
        className="small-movie-card__image"
        onClick={onMovieCardClick}
      >
        <img
          src={posterUrl}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={(evt) => {
          evt.preventDefault();
          onMovieCardClick();
        }}
      >
        <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: movieType.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired
};

export default MovieCard;
