import * as React from "react";
// import PropTypes from "prop-types";
import {connect} from "react-redux";

import Header from "../header/header";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
// import withActiveMovieCard from "../../hocs/with-active-card/with-active-card ";
import {getFavoriteMovies} from "../../reducer/data/selectors";


import {Movie} from "../../prop-types/types";

// const MoviesListWithActiveMovieCard = withActiveMovieCard(MoviesList);

interface Props {
  movies: Movie[],
  onMovieCardClick: (id: number) => void,
};

const MyList: React.FunctionComponent<Props> = (props) => {
  const {movies, onMovieCardClick} = props;

  return (
    <div className="user-page">

      <Header className={`user-page__head`}>
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

// MyList.propTypes = {
//   movies: PropTypes.arrayOf(movieType).isRequired,
//   onMovieCardClick: PropTypes.func.isRequired
// };

export default connect(mapStateToProps, null)(MyList);
