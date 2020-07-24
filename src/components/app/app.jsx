import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {movieType} from "../../prop-types/types.js";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {connect} from "react-redux";
import {getMovies, getPromo} from "../../reducer/data/selectors.js";
import {getInvalidAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";


const MoviePageWrapped = withActiveTab(MoviePage);
class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: false,
    };

    this._handleSignInClick = this._handleSignInClick.bind(this);
  }

  _handleSignInClick() {
    this.setState({
      isSignIn: true,
    });
  }

  _renderSignInPage() {
    const {login, isValidAuthorization} = this.props;
    return (
      <SignIn
        onSubmit={(authData) => {
          login(authData).then(() => {
            this.setState({
              isSignIn: false,
            });
          });
        }}
        isValid={isValidAuthorization}
      />
    );
  }

  _renderReviewPage() {
    const {promo, selectedMovie} = this.props;
    return (
      <AddReview
        onSignInClick={this._handleSignInClick}
        selectedMovie={selectedMovie}
        promo={promo}
      />
    );
  }

  _renderMoviePage() {
    const {activeMovieCard, onMovieCardClick, isBigPlayerActive, onBigPlayerOnOff} = this.props;

    if (this.state.isSignIn) {
      return this._renderSignInPage();
    }

    return (
      <MoviePageWrapped
        movie={activeMovieCard}
        onMovieCardClick={onMovieCardClick}
        isBigPlayerActive={isBigPlayerActive}
        onBigPlayerOnOff={onBigPlayerOnOff}
        onSignInClick={this._handleSignInClick}
      />
    );
  }

  _renderApp() {
    const {
      activeMovieCard,
      onMovieCardClick,
      isBigPlayerActive,
      onBigPlayerOnOff,
    } = this.props;

    if (activeMovieCard !== null) {
      return (
        this._renderMoviePage()
      );
    }

    if (this.state.isSignIn) {
      return this._renderSignInPage();
    }

    return (
      <Main
        onMovieCardClick={onMovieCardClick}
        isBigPlayerActive={isBigPlayerActive}
        onBigPlayerOnOff={onBigPlayerOnOff}
        onSignInClick={this._handleSignInClick}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            {this._renderMoviePage()}
          </Route>
          <Route exact path="/dev-sign-in">
            {this._renderSignInPage()}
          </Route>
          <Route exact path="/dev-review">
            {this._renderReviewPage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  promo: getPromo(state),
  movies: getMovies(state),
  isValidAuthorization: getInvalidAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    return dispatch(UserOperation.login(authData));
  },
});

App.propTypes = {
  activeMovieCard: movieType || null,
  selectedMovie: movieType || undefined,
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
  isValidAuthorization: PropTypes.bool.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
