import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import movieType from "../../prop-types/types.js";

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
    const {movies, onMovieCardClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.title + index}
            movie={movie}
            onMovieCardClick={onMovieCardClick(index)}
            onMovieCardHover={this.handleMovieCardHover(index)}
          />
        ))}
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MovieList;
