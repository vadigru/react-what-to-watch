import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import movieType from "../../prop-types/types.js";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMovieCard: null,
      isPlaying: false
    };

    this.handleMovieCardMouseOver = this.handleMovieCardMouseOver.bind(this);
    this.handleMovieCardMouseOut = this.handleMovieCardMouseOut.bind(this);
  }

  togglePlay(movieCardId) {
    setTimeout(() => {
      if (this.state.activeMovieCard === movieCardId) {
        this.setState((prevState) => ({
          isPlaying: !prevState.isPlaying
        }));
      }
    }, 1000);
  }

  handleMovieCardMouseOver(movieCardId) {
    return () => {
      this.setState(() => ({activeMovieCard: movieCardId}),
          () => this.togglePlay(movieCardId)
      );
    };
  }

  handleMovieCardMouseOut() {
    this.setState(() => ({
      activeMovieCard: null,
      isPlaying: false
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
            onMovieCardClick={onMovieCardClick(index)}
            onMovieCardMouseOver={this.handleMovieCardMouseOver(index)}
            onMovieCardMouseOut={this.handleMovieCardMouseOut}
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
