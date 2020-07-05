import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {showMoreMovies} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={showMoreMovies}
      >Show more</button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  showMoreMovies: PropTypes.func.isRequired
};

export default ShowMoreButton;
