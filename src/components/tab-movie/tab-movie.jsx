import React from "react";
import PropTypes from "prop-types";
import TabItem from "../tab-item/tab-item.jsx";

const TabMovie = (props) => {
  const className = `movie-nav__${props.className || ``}`;
  const restProps = Object.assign({}, props);
  delete restProps.className;

  return (
    <TabItem className={className} {...restProps} />
  );
};

TabMovie.propTypes = {
  className: PropTypes.string || ``.isRequired
};

export default TabMovie;
