import React from "react";
import PropTypes from "prop-types";

const MovieReviews = (props) => {
  const {reviews} = props;
  return (
    <React.Fragment>
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviews.map((review, index) => (
            <div key={review + index} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  })).isRequired
};

export default MovieReviews;
