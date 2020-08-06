import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AxiosPromise} from "axios";

import Header from "../header/header";

import {Operation as DataOperation} from "../../reducer/data/data";
import {getReviewPosting, getReviewSendingError} from "../../reducer/data/selectors";

import {Movie} from "../../prop-types/types";
import {AppRoute} from "../../const";
import history from "../../history";

const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

interface Props {
  activeMovie: Movie;
  onSubmit: (
    {
      movieId,
      rating,
      comment
    }: { movieId: number | string; rating: number; comment: string },
    onSuccess: () => void
  ) => AxiosPromise;
  isReviewPosting: boolean;
  isReviewSendingError: boolean;
  rating: number;
  comment: number;
  onFormDataChange: (evt: React.SyntheticEvent<EventTarget>) => void;
}

class AddReview extends React.PureComponent<Props> {
  private submitFormRef: React.RefObject<HTMLFormElement>;
  private commentRef: React.RefObject<HTMLTextAreaElement>;
  private sendReviewButtonRef: React.RefObject<HTMLButtonElement>;
  constructor(props) {
    super(props);

    this.submitFormRef = React.createRef();
    this.commentRef = React.createRef();
    this.sendReviewButtonRef = React.createRef();
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
      activeMovie,
      isReviewPosting,
      isReviewSendingError,
      rating,
      comment,
      onFormDataChange
    } = this.props;

    const isDisabled = isReviewPosting;
    const isInvalid = rating === 0 || (comment < ReviewLength.MIN || comment > ReviewLength.MAX);

    return (
      !activeMovie ? `ERROR` :
        <React.Fragment>
          <section className="movie-card movie-card--full">
            <div className="movie-card__header">
              <div className="movie-card__bg">
                <img src={activeMovie.backgroundUrl} alt={activeMovie.title} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header className={`movie-card__head`}>
                <nav className="breadcrumbs">
                  <ul className="breadcrumbs__list">
                    <li className="breadcrumbs__item">
                      <Link to={`${AppRoute.MOVIE_PAGE}/${activeMovie.id}`} className="breadcrumbs__link">
                        {activeMovie.title}
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
                  src={activeMovie.posterUrl}
                  alt={activeMovie.title}
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
                onSubmit={(evt) => this._handleSubmit(evt, activeMovie)}
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
                    minLength={ReviewLength.MIN}
                    maxLength={ReviewLength.MAX}
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
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, onSuccess) {
    dispatch(DataOperation.sendReview(commentData, onSuccess));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
