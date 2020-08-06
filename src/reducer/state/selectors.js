import Namespace from "../namespace.js";

export const getGenre = (state) => {
  return state[Namespace.STATE].genre;
};
export const getShowedMovies = (state) => {
  return state[Namespace.STATE].showedMovies;
};
