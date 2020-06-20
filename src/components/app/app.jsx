import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const handleMovieTitleClick = () => {};

const App = (props) => {
  const {title, genre, year, movies} = props;

  return (
    <Main
      title = {title}
      genre = {genre}
      year = {year}
      movies = {movies}
      onMovieTitleClick = {handleMovieTitleClick}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        posterUrl: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export default App;
