import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AxiosPromise} from "axios";

import Header from "../header/header";
import Footer from "../footer/footer";
import MovieDetails from "../movie-details/movie-details";
import MovieError from "../../components/movie-error/movie-error";
import MovieOverview from "../movie-overview/movie-overview";
import MovieReviews from "../movie-reviews/movie-reviews";
import MoviesSimilar from "../movies-similar/movies-similar";
import Tabs from "../tabs/tabs";

import {Operation as DataOperation} from "../../reducer/data/data";
import {getLoadingReviewsStatus} from "../../reducer/data/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

import {Movie} from "../../prop-types/types";
import {Tab, AppRoute} from "../../const";
import history from "../../history";

interface Props {
  id: number;
  activeTab: string;
  authorizationStatus: string;
  activeMovie: Movie;
  movies: Movie[];
  isReviewsLoading: boolean;
  onMovieCardClick: (id: number) => void;
  onTabClick: () => void;
  addMovieToFavorite: (id: number) => AxiosPromise;
  removeMovieFromFavorite: (id: number) => AxiosPromise;
}

const renderActiveTab = (activeTab, movie) => {
  switch (activeTab) {
    case Tab.DETAILS:
      return <MovieDetails movie={movie} />;
    case Tab.REVIEWS:
      return <MovieReviews />;
    default:
      return <MovieOverview movie={movie} />;
  }
};

class MoviePage extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      activeMovie,
      movies,
      onMovieCardClick,
      activeTab,
      onTabClick,
      authorizationStatus,
      addMovieToFavorite,
      removeMovieFromFavorite
    } = this.props;

    const tabNames = Object.keys(Tab).map((key) => Tab[key]);
    const isAuth = authorizationStatus === AuthorizationStatus.AUTH;

    return (

      activeMovie.id !== id ? <MovieError /> :
        <React.Fragment>
          <section
            className="movie-card movie-card--full"
            style={{backgroundColor: `${activeMovie.backgroundColor}`}}
          >
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={activeMovie.backgroundUrl} alt={activeMovie.title} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header className={`movie-card__head`} />

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{activeMovie.title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{activeMovie.genre}</span>
                    <span className="movie-card__year">{activeMovie.release}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <button className="btn btn--play movie-card__button" type="button"
                      onClick={() =>
                        history.push(
                            `${AppRoute.MOVIE_PAGE}/${activeMovie.id}${AppRoute.PLAYER}`
                        )
                      }
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button
                      className="btn btn--list movie-card__button"
                      type="button"
                      onClick={() => {
                        if (activeMovie.isFavorite) {
                          removeMovieFromFavorite(activeMovie.id);
                        } else {
                          addMovieToFavorite(activeMovie.id);
                        }
                      }}
                    >
                      {activeMovie.isFavorite ? (
                        <svg viewBox="0 0 18 14" width="18" height="14">
                          <use xlinkHref="#in-list"></use>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                      )}
                      <span>My list</span>
                    </button>
                    {isAuth && (
                      <Link to={`${AppRoute.MOVIE_PAGE}/${activeMovie.id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">
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
                  <img src={activeMovie.posterUrl} alt={activeMovie.title} width="218" height="327" />
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
                  {renderActiveTab(activeTab, activeMovie)}
                </div>
              </div>
            </div>
          </section>

          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>
              <MoviesSimilar
                movies={movies}
                movie={activeMovie}
                onMovieCardClick={onMovieCardClick}
              />
            </section>

            <Footer />

          </div>
        </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isReviewsLoading: getLoadingReviewsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  addMovieToFavorite(id) {
    dispatch(DataOperation.addMovieToFavorite(id));
  },
  removeMovieFromFavorite(id) {
    dispatch(DataOperation.removeMovieFromFavorite(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
