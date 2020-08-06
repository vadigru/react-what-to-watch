import * as React from "react";

import Header from "../header/header";
import Footer from "../footer/footer";

const MovieError = () => {

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className={`movie-card__head`} />

          <div style={{width: `50%`, margin: `0 auto`}}>
            <h1 style={{textAlign: `center`, lineHeight: `2`, marginBottom: `50px`}}>
            Something went wrong, it looks like we have some kind of unexplained server problem or God knows what else. Sorry and try again later.
            </h1>
          </div>

          <Footer />

        </div>
      </section>
    </React.Fragment>
  );
};

export default MovieError;
