import React from "react";
import PropTypes from "prop-types";
import movieType from "../../prop-types/types.js";
import VideoPlayer from "../video-player/video-player.jsx";
import {START_DELAY} from "../../const.js";

class MovieCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      isPlaying: false
    };

    this.handleMovieCardMouseEnter = this.handleMovieCardMouseEnter.bind(this);
    this.handleMovieCardMouseLeave = this.handleMovieCardMouseLeave.bind(this);
  }

  handleMovieCardMouseEnter() {
    const {movie, onMovieCardMouseHover} = this.props;

    this.timer = setTimeout(() =>
      this.setState({
        isPlaying: true
      }), START_DELAY);
    onMovieCardMouseHover(movie);
  }

  handleMovieCardMouseLeave() {
    const {onMovieCardMouseOut} = this.props;

    if (this.timer) {
      clearTimeout(this.timer);
      this.setState({
        isPlaying: false
      });
      this.timer = null;
    }

    onMovieCardMouseOut();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {isPlaying} = this.state;
    const {movie, onMovieCardClick} = this.props;
    const {title, posterUrl, previewUrl} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this.handleMovieCardMouseEnter}
        onMouseLeave={this.handleMovieCardMouseLeave}
      >
        <div
          className="small-movie-card__image"
          onClick={onMovieCardClick}
        >
          {!isPlaying && (
            <img
              src={posterUrl}
              alt={title}
              width="280"
              height="175"
            />
          )}
          {isPlaying && (
            <VideoPlayer
              isPlaying={isPlaying}
              src={previewUrl}
              autoPlay={true}
            />
          )}

        </div>
        <h3
          className="small-movie-card__title"
          onClick={(evt) => {
            evt.preventDefault();
            onMovieCardClick();
          }}
        >
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: movieType.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardMouseHover: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired
};

export default MovieCard;
