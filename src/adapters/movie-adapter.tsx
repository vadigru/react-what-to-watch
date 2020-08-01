import {formatMovieTime} from "../utils/common.js";
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
