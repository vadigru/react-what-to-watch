import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import GenresList from "../genres-list/genres-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import movieType from "../../prop-types/types.js";
import {getMoviesByGenre} from "../../utils/common.js";
import {ActionCreator} from "../../reducer.js";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";

const Main = (props) => {
  const {movies, showedMovies, showMoreMovies, filteredMovies, genre, promoTitle, promoGenre, promoYear, onMovieCardClick} = props;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoTitle}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoGenre}</span>
                <span className="movie-card__year">{promoYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            onMovieCardClick={onMovieCardClick}
          />

          <MoviesList
            movies={filteredMovies}
            onMovieCardClick={onMovieCardClick}
          />

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
  );
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.films,
  showedMovies: state.showedMovies,
  filteredMovies: getMoviesByGenre(state.genre, state.films, state.showedMovies)
});

const mapDispatchToProps = (dispatch) => ({
  showMoreMovies() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

Main.propTypes = {
  promoTitle: PropTypes.string.isRequired,
  promoGenre: PropTypes.string.isRequired,
  promoYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(movieType).isRequired,
  showedMovies: PropTypes.number.isRequired,
  showMoreMovies: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  filteredMovies: PropTypes.arrayOf(movieType).isRequired
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
