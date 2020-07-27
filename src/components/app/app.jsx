import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route, Router} from "react-router-dom";

import AddReview from "../add-review/add-review.jsx";
import Loading from "../../loader.jsx";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import withForm from "../../hocs/with-form/with-form.jsx";

import {getLoadingFilmsStatus, getLoadingPromoStatus} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getInvalidAuthorizationStatus} from "../../reducer/user/selectors.js";

import {movieType} from "../../prop-types/types.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

const MoviePageWithActiveTab = withActiveTab(MoviePage);
const AddReviewWithForm = withForm(AddReview);

const App = (props) => {
  const {
    movies,
    login,
    isValidAuthorization,
    onMovieCardClick,
    isBigPlayerActive,
    onBigPlayerOnOff,
    isFilmsLoading,
    isPromoLoading
  } = props;

  if (isFilmsLoading || isPromoLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT} render={(routeProps) => {
          return (
            <Main
              {...routeProps}
              onMovieCardClick={onMovieCardClick}
              isBigPlayerActive={isBigPlayerActive}
              onBigPlayerOnOff={onBigPlayerOnOff}
            />
          );
        }}>
        </Route>
        <Route exact path={`${AppRoute.MOVIE_PAGE}/:id`}
          render = {(routeProps) => {
            return (
              <MoviePageWithActiveTab
                {...routeProps}
                id={Number(routeProps.match.params.id)}
                movies={movies}
                onMovieCardClick={onMovieCardClick}
                isBigPlayerActive={isBigPlayerActive}
                onBigPlayerOnOff={onBigPlayerOnOff}
              />
            );
          }}
        />

        <Route exact path={AppRoute.SIGN_IN} render={(routeProps) => {
          return (
            <SignIn
              {...routeProps}
              onSubmit={(authData) => {
                login(authData).then(() => {
                  history.goBack();
                });
              }}
              isValid={isValidAuthorization}
            />
          );
        }}
        />
        <Route exact path={`${AppRoute.MOVIE_PAGE}/:id${AppRoute.ADD_REVIEW}`} render={(routeProps) => {
          return (
            <AddReviewWithForm
              {...routeProps}
              id={Number(routeProps.match.params.id)}
              movies={movies}
            />
          );
        }}>
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  promo: state.DATA.promo,
  movies: state.DATA.films,
  isValidAuthorization: getInvalidAuthorizationStatus(state),
  isFilmsLoading: getLoadingFilmsStatus(state),
  isPromoLoading: getLoadingPromoStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    return dispatch(UserOperation.login(authData));
  }
});

App.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
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
  onMovieCardClick: PropTypes.func.isRequired,
  isBigPlayerActive: PropTypes.bool.isRequired,
  onBigPlayerOnOff: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isValidAuthorization: PropTypes.bool.isRequired,
  isFilmsLoading: PropTypes.bool.isRequired,
  isPromoLoading: PropTypes.bool.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
