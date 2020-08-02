import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AxiosPromise} from "axios";

import Header from "../header/header";
import Footer from "../footer/footer";
import MovieDetails from "../movie-details/movie-details";
import MovieOverview from "../movie-overview/movie-overview";
import MovieReviews from "../movie-reviews/movie-reviews";
import MoviesSimilar from "../movies-similar/movies-similar";
import Tabs from "../tabs/tabs";

import {Operation as DataOperation} from "../../reducer/data/data";
import {ActionCreator} from "../../reducer/state/state";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

import {Movie} from "../../prop-types/types";
import {Tab, AppRoute} from "../../const";
import history from "../../history";
import Loading from "../../loader";

interface Props {
  id: number;
  activeTab: string;
  authorizationStatus: string;
  movies: Movie[];
  movie: Movie;
  onMovieCardClick: (id: number) => void;
  onTabClick: () => void;
  changeSelectedMovieId: (id: number) => {
    type: string;
    payload: string;
  };
  addMovieToFavorite: (id: number) => AxiosPromise;
  removeMovieFromFavorite: (id: number) => AxiosPromise;
}

const renderActiveTab = (activeTab, id, movie) => {
  switch (activeTab) {
    case Tab.DETAILS:
      return <MovieDetails movie={movie} />;
    case Tab.REVIEWS:
      return <MovieReviews movieId={id} />;
    default:
      return <MovieOverview movie={movie} />;
  }
};

class MoviePage extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, changeSelectedMovieId} = this.props;
    changeSelectedMovieId(id);
  }

  render() {
    const {
      id,
      movie,
      movies,
      onMovieCardClick,
      activeTab,
      onTabClick,
      authorizationStatus,
      addMovieToFavorite,
      removeMovieFromFavorite
    } = this.props;

    const {
      title,
      posterUrl,
      backgroundUrl,
      genre,
      release,
      backgroundColor
    } = movie;

    const tabNames = Object.keys(Tab).map((key) => Tab[key]);

    return (
      movie.id !== id ? <Loading /> :
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

              <Header className={`movie-card__head`} />

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{genre}</span>
                    <span className="movie-card__year">{release}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <button className="btn btn--play movie-card__button" type="button"
                      onClick={() =>
                        history.push(
                            `${AppRoute.MOVIE_PAGE}/${movie.id}${AppRoute.PLAYER}`
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
                        if (movie.isFavorite) {
                          removeMovieFromFavorite(movie.id);
                        } else {
                          addMovieToFavorite(movie.id);
                        }
                      }}
                    >
                      {movie.isFavorite ? (
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
                    {authorizationStatus === AuthorizationStatus.AUTH && (
                      <Link to={`${AppRoute.MOVIE_PAGE}/${movie.id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">
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
                  {renderActiveTab(activeTab, id, movie)}
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

            <Footer />

          </div>
        </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  },
  addMovieToFavorite(id) {
    dispatch(DataOperation.addMovieToFavorite(id));
  },
  removeMovieFromFavorite(id) {
    dispatch(DataOperation.removeMovieFromFavorite(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
