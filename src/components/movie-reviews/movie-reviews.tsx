import * as React from "react";
import {connect} from "react-redux";

import {getLoadingReviewsStatus, getReviews} from "../../reducer/data/selectors";

import {formatReviewDate} from "../../utils/common";

interface Props {
  reviews: {
    id: number;
    user: {
      id: number;
      name: string;
    };
    rating: number;
    comment: string;
    date: string;
  }[];
  loadingReviews: boolean;
}

const renderReviews = (reviews) => {
  return (
    <React.Fragment>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{review.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{review.user.name}</cite>
              <time className="review__date" dateTime={formatReviewDate(review.date, false)}>{formatReviewDate(review.date, true)}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>
      ))}
    </React.Fragment>
  );
};

const MovieReviews: React.FunctionComponent<Props> = (props: Props) => {
  const {reviews, loadingReviews} = props;
  const reviewsHalf = Math.ceil(reviews.length / 2);
  const reviewsFirstHalf = reviews.slice(0, reviewsHalf);
  const reviewsSecondHalf = reviews.slice(reviewsHalf);

  return (
    <React.Fragment>
      {loadingReviews ?
        <div style={{marginTop: `100px`, color: `#212121`}}>FAILED TO LOAD COMMENTS</div> :
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {renderReviews(reviewsFirstHalf)}
          </div>
          <div className="movie-card__reviews-col">
            {renderReviews(reviewsSecondHalf)}
          </div>
        </div>}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  loadingReviews: getLoadingReviewsStatus(state)
});

export {MovieReviews};
export default connect(mapStateToProps, null)(MovieReviews);
