import {extend} from "../../utils/common.js";
import {rebuildMovieData, rebuildMoviesData} from "../../adapters/movie-adapter.tsx";
import Namespace from "../namespace.js";

const initialState = {
  films: [],
  promo: {},
  reviews: [],
  isFilmsLoading: false,
  isPromoLoading: false,
  isReviewsLoading: false,
  isReviewPosting: false,
  isReviewSendingError: false,
  isDataLoadingError: false,
};

const ActionType = {
  GET_MOVIES: `GET_MOVIES`,
  GET_PROMO: `GET_PROMO`,
  GET_REVIEWS: `GET_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  ADD_MOVIE_TO_FAVORITE: `ADD_MOVIE_TO_FAVORITE`,
  REMOVE_MOVIE_FROM_FAVORITE: `REMOVE_MOVIE_FROM_FAVORITE`,
  IS_FILMS_LOADING: `IS_FILMS_LOADING`,
  IS_PROMO_LOADING: `IS_PROMO_LOADING`,
  IS_REVIEWS_LOADING: `IS_REVIEWS_LOADING`,
  IS_REVIEW_POSTING: `IS_REVIEW_POSTING`,
  IS_REVIEW_SENDING_ERROR: `IS_REVIEW_SENDING_ERROR`,
  IS_DATA_LOADING_ERROR: `IS_DATA_LOADING_ERROR`,
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
  getMovieReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  }),
  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: reviews,
  }),
  addMovieToFavorite: (movie) => ({
    type: ActionType.ADD_MOVIE_TO_FAVORITE,
    payload: movie
  }),
  removeMovieFromFavorite: (movie) => ({
    type: ActionType.REMOVE_MOVIE_FROM_FAVORITE,
    payload: movie
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
  }),
  dataLoadingError: (isLoading) => ({
    type: ActionType.IS_DATA_LOADING_ERROR,
    payload: isLoading
  })
};

const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingFilms(true));
    dispatch(ActionCreator.dataLoadingError(false));
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.getMovies(rebuildMoviesData(response.data)));
        dispatch(ActionCreator.loadingFilms(false));
        dispatch(ActionCreator.dataLoadingError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingFilms(false));
        dispatch(ActionCreator.dataLoadingError(true));

        throw err;
      });
  },
  getPromo: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingPromo(true));
    dispatch(ActionCreator.dataLoadingError(false));
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.getPromo(rebuildMovieData(response.data)));
        dispatch(ActionCreator.loadingPromo(false));
        dispatch(ActionCreator.dataLoadingError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingPromo(false));
        dispatch(ActionCreator.dataLoadingError(true));
        throw err;
      });
  },
  getMovieReviews: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingReviews(true));
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getMovieReviews(response.data));
        dispatch(ActionCreator.loadingReviews(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadingReviews(true));
        throw err;
      });
  },
  sendReview: (reviewData, onSuccess) => (dispatch, getState, api) => {
    dispatch(ActionCreator.sendingReviewError(false));
    dispatch(ActionCreator.postingReview(true));
    return api.post(`/comments/${reviewData.movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment
    })
    .then(() => {
      dispatch(Operation.getMovieReviews(reviewData.movieId));
      dispatch(ActionCreator.sendingReviewError(false));
      dispatch(ActionCreator.postingReview(false));
      onSuccess();
    })
    .catch((err)=>{
      dispatch(ActionCreator.sendingReviewError(true));
      dispatch(ActionCreator.postingReview(false));
      throw err;
    });
  },
  addMovieToFavorite: (movieId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/1`).then((response) => {
      const movie = rebuildMovieData(response.data);
      const state = getState();

      if (state[Namespace.DATA].promo.id === movie.id) {
        dispatch(ActionCreator.getPromo(movie));
      }

      dispatch(ActionCreator.addMovieToFavorite(movie));
    });
  },
  removeMovieFromFavorite: (movieId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/0`).then((response) => {
      const movie = rebuildMovieData(response.data);
      const state = getState();

      if (state[Namespace.DATA].promo.id === movie.id) {
        dispatch(ActionCreator.getPromo(movie));
      }

      dispatch(ActionCreator.removeMovieFromFavorite(movie));
    });
  },
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
    case ActionType.ADD_MOVIE_TO_FAVORITE:
      return extend(state, {
        films: [
          ...state.films.filter((movie) => movie.id !== action.payload.id),
          action.payload
        ]
      });
    case ActionType.REMOVE_MOVIE_FROM_FAVORITE:
      return extend(state, {
        films: [
          ...state.films.filter((movie) => movie.id !== action.payload.id),
          action.payload
        ]
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
    case ActionType.IS_DATA_LOADING_ERROR:
      return extend(state, {
        isDataLoadingError: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
