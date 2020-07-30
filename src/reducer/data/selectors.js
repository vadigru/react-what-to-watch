import {createSelector} from "reselect";
import Namespace from "../namespace.js";
import {ALL_GENRES} from "../../const.js";

export const getMovies = (state) => {
  return state[Namespace.DATA].films;
};

export const getPromo = (state) => {
  return state[Namespace.DATA].promo;
};

export const getReviews = (state) => {
  return state[Namespace.DATA].reviews;
};

export const getLoadingFilmsStatus = (state) => {
  return state[Namespace.DATA].isFilmsLoading;
};

export const getLoadingPromoStatus = (state) => {
  return state[Namespace.DATA].isPromoLoading;
};

export const getLoadingReviewsStatus = (state) => {
  return state[Namespace.DATA].isReviewsLoading;
};

export const getReviewPosting = (state) => {
  return state[Namespace.DATA].isReviewPosting;
};

export const getReviewSendingError = (state) => {
  return state[Namespace.DATA].isReviewSendingError;
};

export const filterMoviesByGenre = (state) => {
  const movies = state[Namespace.DATA].films;
  const genre = state[Namespace.STATE].genre;
  const showedMovies = state[Namespace.STATE].showedMovies;

  return genre === ALL_GENRES
    ? movies.slice(0, showedMovies)
    : movies.filter((movie) => movie.genre === genre).slice(0, showedMovies);
};

export const getMoviesByGenre = createSelector(
    (state) => state,
    filterMoviesByGenre
);

const findFavoriteMovies = (state) =>
  state[Namespace.DATA].films.filter((movie) => movie.isFavorite);

export const getFavoriteMovies = createSelector(
    (state) => state,
    findFavoriteMovies
);
