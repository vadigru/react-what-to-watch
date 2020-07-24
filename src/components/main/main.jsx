import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import Tabs from "../tabs/tabs.jsx";
import VideoPlayerBig from "../video-player-big/video-player-big.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import UserBlock from "../user-block/user-block.jsx";
import {movieType} from "../../prop-types/types.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";
import {getMaxGenresCount, getGenresList} from "../../utils/common.js";
import {getGenre, getShowedMovies} from "../../reducer/state/selectors.js";
import {getMovies, getPromo, getMoviesByGenre} from "../../reducer/data/selectors.js";
import {getAvatar} from "../../reducer/user/selectors.js";
import {getLoadingFilmsStatus, getLoadingPromoStatus} from "../../reducer/data/selectors.js";

const VideoPlayerBigWrapped = withPlayer(VideoPlayerBig);

const Main = (props) => {
  const {
    movies,
    showedMovies,
    showMoreMovies,
    filteredMovies,
    genre,
    promo,
    avatarUrl,
    onMovieCardClick,
    changeGenre,
    showDefaultMovies,
    isBigPlayerActive,
    onBigPlayerOnOff,
    onSignInClick,
    loadingFilmsStatus,
    loadingPromoStatus,
  } = props;

  const genresList = getMaxGenresCount(getGenresList(movies));

  return (
    isBigPlayerActive ? (
      <VideoPlayerBigWrapped
        movie={promo}
        autoPlay={false}
        onExitButtonClick={onBigPlayerOnOff}
      />
    ) : (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={promo.backgroundUrl} alt={promo.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <UserBlock avatarUrl={avatarUrl} onSignInClick={onSignInClick} />

          </header>

          {loadingPromoStatus ?
            <div style={{textAlign: `center`}}>UNABLE TO FIND PROMO MOVIE DUE TO THE SERVER ERROR</div> :
            <div className="movie-card__wrap">
              <div className="movie-card__info">
                <div className="movie-card__poster">
                  <img src={promo.posterUrl} alt={promo.title} width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{promo.title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{promo.genre}</span>
                    <span className="movie-card__year">{promo.release}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <button
                      className="btn btn--play movie-card__button"
                      type="button"
                      onClick={onBigPlayerOnOff}>
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s">
                        </use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button className="btn btn--list movie-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>}
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            {loadingFilmsStatus ?
              <div style={{textAlign: `center`}}>UNABLE TO FIND ANY MOVIES DUE TO THE SERVER ERROR</div> :
              <React.Fragment>
                <Tabs
                  className={`catalog__genres-`}
                  tabNames={genresList}
                  activeTab={genre}
                  onTabClick={changeGenre}
                  onGenreTabClick={showDefaultMovies}
                />

                <MoviesList
                  movies={filteredMovies}
                  onMovieCardClick={onMovieCardClick}
                />
              </React.Fragment>
            }

            {filteredMovies.length > MOVIES_DEFAULT_AMOUNT && genre !== ALL_GENRES ||
              showedMovies < movies.length && genre === ALL_GENRES
              ? <ShowMoreButton onShowMoreButtonClick={showMoreMovies}/>
              : null}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
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

const mapStateToProps = (state) => ({
  promo: getPromo(state),
  genre: getGenre(state),
  movies: getMovies(state),
  showedMovies: getShowedMovies(state),
  filteredMovies: getMoviesByGenre(state),
  avatarUrl: getAvatar(state),
  loadingFilmsStatus: getLoadingFilmsStatus(state),
  loadingPromoStatus: getLoadingPromoStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  showMoreMovies() {
    dispatch(ActionCreator.showMoreMovies());
  },
  showDefaultMovies() {
    dispatch(ActionCreator.showDefaultMovies());
  }
});

Main.propTypes = {
  promo: PropTypes.shape({
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    backgroundUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string,
    release: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    description: PropTypes.string,
  }),
  avatarUrl: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(movieType).isRequired,
  showedMovies: PropTypes.number.isRequired,
  showMoreMovies: PropTypes.func.isRequired,
  showDefaultMovies: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  filteredMovies: PropTypes.arrayOf(movieType).isRequired,
  isBigPlayerActive: PropTypes.bool.isRequired,
  onBigPlayerOnOff: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  loadingFilmsStatus: PropTypes.bool.isRequired,
  loadingPromoStatus: PropTypes.bool.isRequired
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
