import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import movieType from "../../prop-types/types.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMovieCard: null
    };

    this.handleMovieCardClick = this.handleMovieCardClick.bind(this);
  }

  handleMovieCardClick(movie) {
    return () => this.setState({activeMovieCard: movie});
  }

  _renderApp() {
    const {title, genre, year, movies} = this.props;
    const {activeMovieCard} = this.state;

    if (activeMovieCard !== null) {
      return (
        <MoviePage
          movies={movies}
          movie={activeMovieCard}
          onMovieCardClick={this.handleMovieCardClick}
        />
      );
    }

    return (
      <Main
        title = {title}
        genre = {genre}
        year = {year}
        movies = {movies}
        onMovieCardClick={this.handleMovieCardClick}
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
            <MoviePage
              movie={this.props.movies[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(movieType).isRequired
};

export default App;
