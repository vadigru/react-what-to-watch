import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMovieCard: null
    };
    this.handleMovieCardHover = this.handleMovieCardHover.bind(this);
  }

  handleMovieCardHover(movieCardId) {
    return () => this.setState({activeMovieCard: movieCardId});
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.title + index}
            movie={movie}
            onMovieTitleClick={onMovieTitleClick}
            onMovieCardHover={this.handleMovieCardHover(index)}
          />
        ))}
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        posterUrl: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MovieList;
