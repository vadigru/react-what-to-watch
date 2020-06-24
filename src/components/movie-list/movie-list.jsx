import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import movieType from "../../prop-types/types.js";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      activeMovieCard: null,
      isPlaying: false
    };

    this.handleMovieCardMouseEnter = this.handleMovieCardMouseEnter.bind(this);
    this.handleMovieCardMouseLeave = this.handleMovieCardMouseLeave.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    return () => {
      this.timer = setTimeout(() => {
        this.setState((prevState) => ({
          isPlaying: !prevState.isPlaying
        }));
      }, 1000);
    };
  }

  handleMovieCardMouseEnter(movieCardId) {
    return () => {
      this.setState(() => ({activeMovieCard: movieCardId}),
          this.togglePlay(movieCardId)
      );
    };
  }

  handleMovieCardMouseLeave() {
    clearTimeout(this.timer);
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
            onMovieCardMouseEnter={this.handleMovieCardMouseEnter(index)}
            onMovieCardMouseLeave={this.handleMovieCardMouseLeave}
            isPlaying={this.state.activeMovieCard === index && this.state.isPlaying}
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
