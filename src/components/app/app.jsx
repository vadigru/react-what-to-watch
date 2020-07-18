import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {movieType} from "../../prop-types/types.js";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import SignIn from "../sign-in/sign-in.jsx";

const MoviePageWrapped = withActiveTab(MoviePage);
class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderSignInPage() {
    const {onSubmitClick} = this.props;
    return (
      <SignIn
        onSubmit={onSubmitClick}
      />
    );
  }

  _renderMoviePage() {
    const {activeMovieCard, onMovieCardClick, isBigPlayerActive, onBigPlayerOnOff} = this.props;

    return (
      <MoviePageWrapped
        movie={activeMovieCard}
        onMovieCardClick={onMovieCardClick}
        isBigPlayerActive={isBigPlayerActive}
        onBigPlayerOnOff={onBigPlayerOnOff}
      />
    );
  }

  _renderApp() {
    const {activeMovieCard, onMovieCardClick, isBigPlayerActive, onBigPlayerOnOff, onSignInClickHandler, isSignIn} = this.props;

    if (activeMovieCard !== null) {
      return (
        this._renderMoviePage()
      );
    }

    if (isSignIn) {
      return this._renderSignInPage();
    }

    return (
      <Main
        onMovieCardClick={onMovieCardClick}
        isBigPlayerActive={isBigPlayerActive}
        onBigPlayerOnOff={onBigPlayerOnOff}
        onSignInClickHandler={onSignInClickHandler}
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeMovieCard: movieType || null.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  isBigPlayerActive: PropTypes.bool.isRequired,
  onBigPlayerOnOff: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  onSignInClickHandler: PropTypes.func.isRequired,
  isSignIn: PropTypes.bool.isRequired,
  onSubmitClick: PropTypes.func.isRequired
};

export default App;
