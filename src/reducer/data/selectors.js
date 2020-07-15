import Namespace from "../namespace.js";
import {createSelector} from "reselect";
import {ALL_GENRES} from "../../const.js";

export const getMovies = (state) => {
  return state[Namespace.DATA].films;
};

export const getPromo = (state) => {
  return state[Namespace.DATA].promo;
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

