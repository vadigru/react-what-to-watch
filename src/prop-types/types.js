import PropTypes from "prop-types";

export const movieType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  backgroundUrl: PropTypes.string.isRequired,
  // backgroundColor: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  release: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string.isRequired),
  time: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  // isFavorite: PropTypes.bool.isRequired,
  videoUrl: PropTypes.string.isRequired,
});
