import {ALL_GENRES, RatingLevel, MAX_GENRES_AMOUNT} from "../const.js";

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

export const getMaxGenresCount = (genresList) => {
  return genresList.length > MAX_GENRES_AMOUNT
    ? genresList.slice(0, MAX_GENRES_AMOUNT + 1)
    : genresList;
};

export const getGenresList = (movies) => {
  return [ALL_GENRES].concat(Array.from(new Set(movies.map((movie) => movie.genre))));
};

export const formatTime = (value) => {
  const hours = Math.floor(value / (60 * 60)) < 1 ? 0 : Math.floor(value / (60 * 60));

  const divisorForMinutes = value % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60) < 1 ? 0 : Math.floor(divisorForMinutes / 60);

  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.ceil(divisorForSeconds) < 1 ? 0 : Math.ceil(divisorForSeconds);

  const addZero = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const outputTime = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  return outputTime;
};

export const formatMovieTime = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours}h ${(`0` + minutes).slice(-2)}m`;
};

export const rebuildMovieData = (movie) => {
  return {
    title: movie.name,
    posterUrl: movie.poster_image,
    backgroundUrl: movie.background_image,
    backgroundColor: movie.background_color,
    previewUrl: movie.preview_video_link,
    previewImage: movie.preview_image,
    genre: movie.genre,
    release: movie.released,
    director: movie.director,
    starring: movie.starring,
    time: formatMovieTime(movie.run_time),
    rating: movie.rating,
    votes: movie.scores_count,
    description: movie.description,
    id: movie.id,
    isFavorite: movie.is_favorite,
    videoUrl: movie.video_link,
  };
};

export const rebuildMoviesData = (movies) => movies.map(rebuildMovieData);

export const formatReviewDate = (dateData, isForShow) => {
  const date = new Date(dateData);
  const dateFormat = new Intl.DateTimeFormat(`en-US`, {year: `numeric`, month: `${isForShow ? `long` : `2-digit`}`, day: `numeric`});
  const [{value: month},, {value: day},, {value: year}] = dateFormat.formatToParts(date);
  return isForShow ? `${month} ${day}, ${year}` : `${year}-${month}-${day}`;
};

