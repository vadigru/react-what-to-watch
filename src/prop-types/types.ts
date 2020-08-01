export type Movie = {
  title: string,
  posterUrl: string,
  backgroundUrl: string,
  backgroundColor: string,
  previewUrl: string,
  previewImage: string,
  genre: string,
  release: number,
  director: string,
  starring: string[],
  time: string,
  rating: number,
  votes: number,
  description: string,
  id: number,
  isFavorite: boolean,
  videoUrl: string,
};

// export const promoType = PropTypes.shape({
//   title: PropTypes.string,
//   posterUrl: PropTypes.string,
//   backgroundUrl: PropTypes.string,
//   backgroundColor: PropTypes.string,
//   previewUrl: PropTypes.string,
//   previewImage: PropTypes.string,
//   genre: PropTypes.string,
//   release: PropTypes.number,
//   director: PropTypes.string,
//   starring: PropTypes.arrayOf(PropTypes.string),
//   time: PropTypes.string,
//   rating: PropTypes.number,
//   votes: PropTypes.number,
//   description: PropTypes.string,
//   id: PropTypes.number,
//   isFavorite: PropTypes.bool,
//   videoUrl: PropTypes.string,
// });