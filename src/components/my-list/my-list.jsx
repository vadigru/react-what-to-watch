import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer.jsx";
import MoviesList from "../../components/movies-list/movies-list.jsx";
// import withActiveMovieCard from "../../hocs/with-active-card/with-active-card.jsx";
import {getFavoriteMovies} from "../../reducer/data/selectors.js";


import {movieType} from "../../prop-types/types.js";

// const MoviesListWithActiveMovieCard = withActiveMovieCard(MoviesList);

const MyList = (props) => {
  const {movies, onMovieCardClick} = props;

  return (
    <div className="user-page">

      <Header className={`user-page__head`} isSignIn={false}>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList
          movies={movies}
          onMovieCardClick={onMovieCardClick}
        />

      </section>

      <Footer />

    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: getFavoriteMovies(state)
});

MyList.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(MyList);
