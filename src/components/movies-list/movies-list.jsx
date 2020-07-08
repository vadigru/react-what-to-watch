import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import movieType from "../../prop-types/types.js";

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };

    this.handleMovieCardMouseHover = this.handleMovieCardMouseHover.bind(this);
    this.handleMovieCardMouseOut = this.handleMovieCardMouseOut.bind(this);
  }

  handleMovieCardMouseHover(movie) {
    return () => {
      this.setState(() => (
        {activeMovieCard: movie}
      ));
    };
  }

  handleMovieCardMouseOut() {
    this.setState(() => ({
      activeMovieCard: null,
    }));
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.title + index}
            movie={movie}
            onMovieCardClick={onMovieCardClick(movie)}
            onMovieCardMouseHover={this.handleMovieCardMouseHover}
            onMovieCardMouseOut={this.handleMovieCardMouseOut}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
