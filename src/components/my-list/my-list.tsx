import * as React from "react";
import {connect} from "react-redux";

import Header from "../header/header";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
import {getFavoriteMovies} from "../../reducer/data/selectors";

import {Movie} from "../../prop-types/types";

interface Props {
  movies: Movie[];
  onMovieCardClick: (id: number) => void;
}

const MyList: React.FunctionComponent<Props> = (props: Props) => {
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

export default connect(mapStateToProps, null)(MyList);
