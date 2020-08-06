import * as React from "react";
import {connect} from "react-redux";
import {Switch, Route, Router} from "react-router-dom";
import {AxiosPromise} from "axios";

import AddReview from "../add-review/add-review";
import Loading from "../../loader";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import MyList from "../my-list/my-list";
import PrivateRoute from "../../private-route/private-route";
import SignIn from "../sign-in/sign-in";
import VideoPlayerBig from "../video-player-big/video-player-big";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import withForm from "../../hocs/with-form/with-form";
import withPlayer from "../../hocs/with-player/with-player";

import {Operation as DataOperation} from "../../reducer/data/data";

import {getLoadingFilmsStatus, getLoadingPromoStatus, getDataLoadingError} from "../../reducer/data/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getInvalidAuthorizationStatus} from "../../reducer/user/selectors";

import {Movie} from "../../prop-types/types";
import {AppRoute} from "../../const";
import history from "../../history";


interface Props {
  movies: Movie[];
  promo: Movie;
  isValidAuthorization: boolean;
  isFilmsLoading: boolean;
  isPromoLoading: boolean;
  isDataLoadingError: boolean;
  login: (authData: {email: string; password: string}) => AxiosPromise;
  getMovieReviews: (id: number) => AxiosPromise;
}

const MoviePageWithActiveTab = withActiveTab(MoviePage);
const AddReviewWithForm = withForm(AddReview);
const VideoPlayerBigWithPlayer = withPlayer(VideoPlayerBig);

class App extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(id) {
    const {getMovieReviews} = this.props;

    return () => {
      getMovieReviews(id);
      history.push(`${AppRoute.MOVIE_PAGE}/${id}`, {});
    };
  }

  render() {
    const {
      promo,
      movies,
      login,
      isValidAuthorization,
      isFilmsLoading,
      isPromoLoading,
      isDataLoadingError,
      getMovieReviews
    } = this.props;

    if (isPromoLoading || isFilmsLoading) {
      return <Loading />;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.ROOT}
            render={(routeProps) => {
              return (
                <Main
                  {...routeProps}
                  onMovieCardClick={this._handleMovieCardClick}
                  isDataLoadingError={isDataLoadingError}
                />
              );
            }}>
          </Route>

          <Route
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id`}
            render = {(routeProps) => {
              const activeMovieId = Number(routeProps.match.params.id);
              const activeMovie = (movies.find((film) => film.id === activeMovieId));

              return (
                <MoviePageWithActiveTab
                  {...routeProps}
                  id={Number(routeProps.match.params.id)}
                  getMovieReviews={getMovieReviews}
                  movies={movies}
                  activeMovie={activeMovie || promo}
                  onMovieCardClick={this._handleMovieCardClick}
                />
              );
            }}>
          </Route>

          <PrivateRoute
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id${AppRoute.ADD_REVIEW}`}
            render={(routeProps) => {
              const activeMovieId = Number(routeProps.match.params.id);
              const activeMovie = (movies.find((film) => film.id === activeMovieId));

              return (
                <AddReviewWithForm
                  {...routeProps}
                  id={Number(routeProps.match.params.id)}
                  activeMovie={activeMovie}
                />
              );
            }}>
          </PrivateRoute>

          <Route
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id${AppRoute.PLAYER}`}
            render={(routeProps) => {
              const activeMovieId = Number(routeProps.match.params.id);
              const activeMovie = (movies.find((film) => film.id === activeMovieId));

              return <VideoPlayerBigWithPlayer
                autoPlay={false}
                videoLink={activeMovie.videoUrl}
                videoBackground={activeMovie.backgroundUrl}
                videoTitle={activeMovie.title}
                onExitButtonClick={routeProps.history.goBack}
              />;
            }}>
          </Route>

          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => (
              <MyList
                onMovieCardClick={this._handleMovieCardClick} />
            )}>
          </PrivateRoute>

          <Route
            exact
            path={AppRoute.SIGN_IN}
            render={(routeProps) => {
              return (
                <SignIn
                  {...routeProps}
                  onSubmit={(authData) => {
                    login(authData).then(() => {
                      routeProps.history.goBack();
                    });
                  }}
                  isValid={isValidAuthorization}
                />
              );
            }}>
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  promo: state.DATA.promo,
  movies: state.DATA.films,
  isValidAuthorization: getInvalidAuthorizationStatus(state),
  isFilmsLoading: getLoadingFilmsStatus(state),
  isPromoLoading: getLoadingPromoStatus(state),
  isDataLoadingError: getDataLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    return dispatch(UserOperation.login(authData));
  },
  getMovieReviews(id) {
    dispatch(DataOperation.getMovieReviews(id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
