import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Header from "../header/header.jsx";

import {Operation as DataOperation, ActionCreator} from "../../reducer/data/data.js";
import {getReviewPosting, getReviewSendingError} from "./../../reducer/data/selectors.js";
import {ActionCreator as StateActionCreator} from "../../reducer/state/state.js";
import {getSelectedMovie} from "../../reducer/state/selectors.js";

import {movieType} from "../../prop-types/types.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submitFormRef = React.createRef();
    this.commentRef = React.createRef();
    this.sendReviewButtonRef = React.createRef();
  }

  componentDidMount() {
    const {id, getReviews, changeSelectedMovieId} = this.props;
    changeSelectedMovieId(id);
    getReviews(id);
  }

  _handleSubmit(evt, movie) {
    const {onSubmit} = this.props;
    evt.preventDefault();


    onSubmit(
        {
          movieId: movie.id,
          rating: this.submitFormRef.current.rating.value,
          comment: this.commentRef.current.value
        },
        () => {
          history.goBack();
        }
    );
  }

  render() {
    const {
      id,
      movie,
      isReviewPosting,
      isReviewSendingError,
      rating,
      comment,
      onFormDataChange
    } = this.props;

    const isDisabled = isReviewPosting;
    const isInvalid = rating === 0 || (comment < MIN_REVIEW_LENGTH || comment > MAX_REVIEW_LENGTH);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={movie.backgroundUrl} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header className={`movie-card__head`} isSignIn={false}>
              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link to={`${AppRoute.MOVIE_PAGE}/${id}`} className="breadcrumbs__link">
                      {movie.title}
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to={AppRoute.ADD_REVIEW} className="breadcrumbs__link">Add review</Link>
                  </li>
                </ul>
              </nav>
            </Header>

            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                width="218"
                height="327"
              />
            </div>
          </div>

          <div className="add-review">
            <form
              action="#"
              className="add-review__form"
              ref={this.submitFormRef}
              onSubmit={(evt) => this._handleSubmit(evt, movie)}
            >
              <div className="rating">
                <div className="rating__stars">
                  <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={(evt) => onFormDataChange(evt)} disabled={isDisabled}/>
                  <label className="rating__label" htmlFor="star-1" >Rating 1</label>

                  <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={(evt) => onFormDataChange(evt)} disabled={isDisabled}/>
                  <label className="rating__label" htmlFor="star-2">Rating 2</label>

                  <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={(evt) => onFormDataChange(evt)} disabled={isDisabled}/>
                  <label className="rating__label" htmlFor="star-3">Rating 3</label>

                  <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={(evt) => onFormDataChange(evt)} disabled={isDisabled} />
                  <label className="rating__label" htmlFor="star-4">Rating 4</label>

                  <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={(evt) => onFormDataChange(evt)} disabled={isDisabled} />
                  <label className="rating__label" htmlFor="star-5">Rating 5</label>
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  ref={this.commentRef}
                  disabled={isDisabled}
                  minLength={MIN_REVIEW_LENGTH}
                  maxLength={MAX_REVIEW_LENGTH}
                  onChange={(evt) => onFormDataChange(evt)}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    ref={this.sendReviewButtonRef}
                    disabled={isDisabled || isInvalid}
                    style={{cursor: `${isDisabled || isInvalid ? `default` : `pointer`}`}}
                  >Post</button>
                </div>

              </div>
            </form>
            {isReviewSendingError ?
              <div style={{color: `#212121`}}>We cannot post your comment right now due to the server problem. Please try again soon.</div> : ``}
          </div>

        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isReviewPosting: getReviewPosting(state),
  isReviewSendingError: getReviewSendingError(state),
  movie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, onSuccess, onError) {
    dispatch(ActionCreator.postingReview(true));
    dispatch(DataOperation.sendReview(commentData, onSuccess, onError));
  },
  changeSelectedMovieId(id) {
    dispatch(StateActionCreator.changeSelectedMovieId(id));
  },
  getReviews(id) {
    dispatch(DataOperation.getReviews(id));
  }
});

AddReview.propTypes = {
  id: PropTypes.number.isRequired,
  movie: movieType.isRequired,
  promo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    backgroundUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string,
    release: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isReviewPosting: PropTypes.bool.isRequired,
  isReviewSendingError: PropTypes.bool.isRequired,
  getReviews: PropTypes.func.isRequired,
  changeSelectedMovieId: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.number.isRequired,
  onFormDataChange: PropTypes.func.isRequired
};

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
