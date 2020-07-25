import Namespace from "../namespace.js";
import {createSelector} from "reselect";

export const getGenre = (state) => {
  return state[Namespace.STATE].genre;
};
export const getShowedMovies = (state) => {
  return state[Namespace.STATE].showedMovies;
};

const findSelectedMovie = (state) => {
  const movies = state[Namespace.DATA].films;
  const id = state[Namespace.STATE].selectedMovieId;
  return movies.find((movie) => movie.id === id);
};

export const getSelectedMovie = createSelector(
    (state) => state,
    findSelectedMovie
);
