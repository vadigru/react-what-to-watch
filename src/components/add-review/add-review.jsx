import React from "react";
import {connect} from "react-redux";
import {movieType} from "../../prop-types/types.js";
import PropTypes from "prop-types";
import UserBlock from "../user-block/user-block.jsx";
import {Operation, ActionCreator} from "../../reducer/data/data.js";
import {Redirect} from "react-router-dom";
import {getReviewPosting, getReviewSendingError} from "./../../reducer/data/selectors.js";
import {getAvatar} from "../../reducer/user/selectors.js";

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submitFormRef = React.createRef();
    this.commentRef = React.createRef();
    this.sendReviewButtonRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleFormDisability = this.toggleFormDisability.bind(this);

    this.state = {
      commentAdded: false,
      isFormInvalid: true
    };
  }

  toggleFormDisability() {
    this.commentRef.current.disabled = !this.commentRef.current.disabled;
    this.sendReviewButtonRef.current.disabled = !this.sendReviewButtonRef
      .current.disabled;
  }

  handleSubmit(evt, movie) {
    const {onSubmit} = this.props;
    evt.preventDefault();
    this.toggleFormDisability();

    onSubmit(
        {
          movieId: movie.id,
          rating: this.submitFormRef.current.rating.value,
          comment: this.commentRef.current.value
        },
        () => {
          this.toggleFormDisability();
          this.setState({commentAdded: true});
        },
        () => {
          this.toggleFormDisability();
        }
    );
  }

  handleChange(evt) {
    this.setState({
      isFormInvalid:
        evt.target.value.length < MIN_REVIEW_LENGTH ||
        evt.target.value.length > MAX_REVIEW_LENGTH
    });
  }

  render() {
    const {
      selectedMovie,
      promo,
      isReviewPosting,
      isReviewSendingError,
      avatarUrl,
      onSignInClick
    } = this.props;
    const starSelectDisable = isReviewPosting ? `disable` : ``;
    const movie = selectedMovie || promo;

    return (
      <React.Fragment>
        {(this.state.commentAdded) && <Redirect to="/" />}
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={movie.backgroundUrl} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a href="movie-page.html" className="breadcrumbs__link">
                      {movie.title}
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <UserBlock avatarUrl={avatarUrl} onSignInClick={onSignInClick}/>

            </header>

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
              onSubmit={(evt) => this.handleSubmit(evt, movie)}
            >
              <div className="rating">
                <div className="rating__stars">
                  <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={starSelectDisable}/>
                  <label className="rating__label" htmlFor="star-1" >Rating 1</label>

                  <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={starSelectDisable}/>
                  <label className="rating__label" htmlFor="star-2">Rating 2</label>

                  <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={starSelectDisable} defaultChecked />
                  <label className="rating__label" htmlFor="star-3">Rating 3</label>

                  <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={starSelectDisable} />
                  <label className="rating__label" htmlFor="star-4">Rating 4</label>

                  <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={starSelectDisable} />
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
                  minLength={MIN_REVIEW_LENGTH}
                  maxLength={MAX_REVIEW_LENGTH}
                  onChange={this.handleChange}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    ref={this.sendReviewButtonRef}
                    disabled={this.state.isFormInvalid}
                    style={{cursor: `${this.state.isFormInvalid ? `default` : `pointer`}`}}
                  >Post</button>
                </div>

              </div>
            </form>
            {isReviewSendingError ?
              <div style={{color: `#212121`}}>We cannot send your post right now due to the server problem. Please try again soon.</div> : ``}
          </div>

        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isReviewPosting: getReviewPosting(state),
  isReviewSendingError: getReviewSendingError(state),
  avatarUrl: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, onSuccess, onError) {
    dispatch(ActionCreator.postingReview(true));
    dispatch(Operation.sendReview(commentData, onSuccess, onError));
  }
});

AddReview.propTypes = {
  selectedMovie: movieType,
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
  avatarUrl: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired
};

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
