import * as React from "react";

import {Movie} from "../../prop-types/types";

import {getTextedRating} from "../../utils/common";

interface Props {
  movie: Movie;
}

const MovieOverview: React.FunctionComponent<Props> = (props: Props) => {
  const {movie} = props;
  const {rating, votes, director, starring, description} = movie;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getTextedRating(rating)}</span>
          <span className="movie-rating__count">{votes} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring:
          {starring.join(`, `)} and other</strong>
        </p>
      </div>
    </React.Fragment>
  );
};

export default MovieOverview;
