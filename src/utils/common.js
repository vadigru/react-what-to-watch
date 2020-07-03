import {RatingLevel, ALL_GENRES} from "../const.js";

export const getTextedRating = (rating) => {
  switch (true) {
    case rating >= RatingLevel.ZERO && rating <= RatingLevel.BAD:
      return `Bad`;
    case rating > RatingLevel.BAD && rating <= RatingLevel.NORMAL:
      return `Normal`;
    case rating > RatingLevel.NORMAL && rating <= RatingLevel.GOOD:
      return `Good`;
    case rating > RatingLevel.GOOD && rating < RatingLevel.AWESOME:
      return `Very good`;
    default:
      return `Awesome`;
  }
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getMoviesByGenre = (genre, movies) => {
  return genre === ALL_GENRES
    ? movies
    : movies.filter((movie) => movie.genre === genre);
};
