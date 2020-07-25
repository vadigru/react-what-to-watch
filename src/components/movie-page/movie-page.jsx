import React from "react";
import PropTypes from "prop-types";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MoviesSimilar from "../movies-similar/movies-similar.jsx";
import UserBlock from "../user-block/user-block.jsx";
import {movieType} from "../../prop-types/types.js";
import Tabs from "../tabs/tabs.jsx";
import {Tab} from "../../const.js";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import VideoPlayerBig from "../video-player-big/video-player-big.jsx";
import {getMovies} from "../../reducer/data/selectors.js";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getAuthorizationStatus, getAvatar} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user";

const VideoPlayerBigWrapped = withPlayer(VideoPlayerBig);

const MoviePage = (props) => {
  const {movies,
    movie,
    onMovieCardClick,
    activeTab,
    onTabClick,
    onBigPlayerOnOff,
    isBigPlayerActive,
    authorizationStatus,
    avatarUrl,
    onSignInClick
  } = props;

  const {title,
    posterUrl,
    backgroundUrl,
    genre,
    release,
    backgroundColor} = movie;

  const renderActiveTab = () => {
    switch (activeTab) {
      case Tab.DETAILS:
        return <MovieDetails movie={movie} />;
      case Tab.REVIEWS:
        return <MovieReviews movieId={movie.id} />;
      default:
        return <MovieOverview movie={movie} />;
    }
  };

  const tabNames = Object.values(Tab);
  return (
    isBigPlayerActive ? (
      <VideoPlayerBigWrapped
        movie={movie}
        autoPlay={false}
        onExitButtonClick={onBigPlayerOnOff}
      />
    ) : (
      <React.Fragment>
        <section
          className="movie-card movie-card--full"
          style={{backgroundColor: `${backgroundColor}`}}
        >
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundUrl} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <UserBlock avatarUrl={avatarUrl} onSignInClick={onSignInClick}/>

            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{release}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button"
                    onClick={onBigPlayerOnOff}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  {authorizationStatus === AuthorizationStatus.AUTH && (
                    <Link to="/dev-review" className="btn movie-card__button">
                      Add review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterUrl} alt={title} width="218" height="327" />
              </div>
              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <Tabs
                      className={`movie-nav__`}
                      tabNames={tabNames}
                      activeTab={activeTab}
                      onTabClick={onTabClick}
                    />
                  </ul>
                </nav>
                {renderActiveTab()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesSimilar
              movies={movies}
              movie={movie}
              onMovieCardClick={onMovieCardClick}
            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    )
  );
};

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(movieType),
  movie: movieType.isRequired,
  activeTab: PropTypes.string,
  onMovieCardClick: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onBigPlayerOnOff: PropTypes.func.isRequired,
  isBigPlayerActive: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatar(state),
});

export default connect(mapStateToProps)(MoviePage);
