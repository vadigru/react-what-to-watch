import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route, Router} from "react-router-dom";

import AddReview from "../add-review/add-review.jsx";
import Loading from "../../loader.jsx";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../../private-route/private-route.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import VideoPlayerBig from "../../components/video-player-big/video-player-big.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import withForm from "../../hocs/with-form/with-form.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";

import {ActionCreator} from "../../reducer/state/state.js";
import {getSelectedMovie} from "../../reducer/state/selectors.js";
import {getLoadingFilmsStatus, getLoadingPromoStatus} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getInvalidAuthorizationStatus} from "../../reducer/user/selectors.js";

import {movieType} from "../../prop-types/types.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

const MoviePageWithActiveTab = withActiveTab(MoviePage);
const AddReviewWithForm = withForm(AddReview);
const VideoPlayerBigWithPlayer = withPlayer(VideoPlayerBig);

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(id) {
    const {getReviews, changeSelectedMovieId} = this.props;
    return () => {
      getReviews(id);
      changeSelectedMovieId(id);
      history.push(`${AppRoute.MOVIE_PAGE}/${id}`);
    };
  }

  render() {
    const {
      promo,
      movies,
      movie,
      login,
      isValidAuthorization,
      isFilmsLoading,
      isPromoLoading
    } = this.props;

    if (isFilmsLoading || isPromoLoading) {
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
                />
              );
            }}>
          </Route>

          <Route
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id`}
            render = {(routeProps) => {
              return (
                <MoviePageWithActiveTab
                  {...routeProps}
                  id={Number(routeProps.match.params.id)}
                  movies={movies || promo}
                  onMovieCardClick={this._handleMovieCardClick}
                />
              );
            }}>
          </Route>

          <PrivateRoute
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id${AppRoute.ADD_REVIEW}`}
            render={(routeProps) => {
              return (
                <AddReviewWithForm
                  {...routeProps}
                  id={Number(routeProps.match.params.id)}
                  movies={movies}
                />
              );
            }}>
          </PrivateRoute>

          <Route
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id${AppRoute.PLAYER}`}
            render={(routeProps) => (
              <VideoPlayerBigWithPlayer
                onExitButtonClick={routeProps.history.goBack}
                movie={movie || promo}
                autoPlay={false}
                id={Number(routeProps.match.params.id) || promo.id}
              />
            )}>
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
                  isSignIn={false}
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
  movie: getSelectedMovie(state),
  isValidAuthorization: getInvalidAuthorizationStatus(state),
  isFilmsLoading: getLoadingFilmsStatus(state),
  isPromoLoading: getLoadingPromoStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    return dispatch(UserOperation.login(authData));
  },
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  }
});

App.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
  movie: movieType,
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
  login: PropTypes.func.isRequired,
  isValidAuthorization: PropTypes.bool.isRequired,
  isFilmsLoading: PropTypes.bool.isRequired,
  isPromoLoading: PropTypes.bool.isRequired,
  getReviews: PropTypes.func.isRequired,
  changeSelectedMovieId: PropTypes.func.isRequired,

};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
