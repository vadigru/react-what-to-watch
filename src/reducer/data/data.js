import {extend} from "../../utils/common.js";
import {rebuildMovieData, rebuildMoviesData} from "../../utils/common.js";

const initialState = {
  films: [],
  promo: {},
  reviews: [],
  isFilmsLoading: false,
  isPromoLoading: false,
  isReviewsLoading: false,
  isReviewPosting: false,
  isReviewSendingError: false,
};

const ActionType = {
  GET_MOVIES: `GET_MOVIES`,
  GET_PROMO: `GET_PROMO`,
  GET_REVIEWS: `GET_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  IS_FILMS_LOADING: `IS_FILMS_LOADING`,
  IS_PROMO_LOADING: `IS_PROMO_LOADING`,
  IS_REVIEWS_LOADING: `IS_REVIEWS_LOADING`,
  IS_REVIEW_POSTING: `IS_REVIEW_POSTING`,
  IS_REVIEW_SENDING_ERROR: `IS_REVIEW_SENDING_ERROR`,
};

const ActionCreator = {
  getMovies: (movies) => ({
    type: ActionType.GET_MOVIES,
    payload: movies,
  }),
  getPromo: (movie) => ({
    type: ActionType.GET_PROMO,
    payload: movie,
  }),
  getReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  }),
  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: reviews,
  }),
  loadingFilms: (isLoading) => ({
    type: ActionType.IS_FILMS_LOADING,
    payload: isLoading,
  }),
  loadingPromo: (isLoading) => ({
    type: ActionType.IS_PROMO_LOADING,
    payload: isLoading
  }),
  loadingReviews: (isLoading) => ({
    type: ActionType.IS_REVIEWS_LOADING,
    payload: isLoading
  }),
  postingReview: (isPosting) => ({
    type: ActionType.IS_REVIEW_POSTING,
    payload: isPosting
  }),
  sendingReviewError: (isSendingError) => ({
    type: ActionType.IS_REVIEW_SENDING_ERROR,
    payload: isSendingError
  })
};

const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.getMovies(rebuildMoviesData(response.data)));
        dispatch(ActionCreator.loadingFilms(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingFilms(true));
        throw err;
      });
  },
  getPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.getPromo(rebuildMovieData(response.data)));
        dispatch(ActionCreator.loadingPromo(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingPromo(true));
        throw err;
      });
  },
  getReviews: (movie) => (dispatch, getState, api) => {
    return api.get(`/comments/${movie.id}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
        dispatch(ActionCreator.loadingReviews(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingReviews(true));
        throw err;
      });
  },
  sendReview: (reviewData, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/comments/${reviewData.movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment
    })
    .then((response) => {
      dispatch(ActionCreator.getReviews(response.data));
      dispatch(ActionCreator.postingReview(true));
      dispatch(ActionCreator.sendingReviewError(false));
      onSuccess();
    })
    .catch((err)=>{
      dispatch(ActionCreator.postingReview(false));
      dispatch(ActionCreator.sendingReviewError(true));
      onError();
      throw err;
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.GET_PROMO:
      return extend(state, {
        promo: action.payload,
      });
    case ActionType.GET_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.IS_FILMS_LOADING:
      return extend(state, {
        isFilmsLoading: action.payload,
      });
    case ActionType.IS_PROMO_LOADING:
      return extend(state, {
        isPromoLoading: action.payload,
      });
    case ActionType.IS_REVIEWS_LOADING:
      return extend(state, {
        isReviewsLoading: action.payload,
      });
    case ActionType.IS_REVIEW_POSTING:
      return extend(state, {
        isReviewPosting: action.payload,
      });
    case ActionType.IS_REVIEW_SENDING_ERROR:
      return extend(state, {
        isReviewSendingError: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};