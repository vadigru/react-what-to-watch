import React from "react";
import PropTypes from "prop-types";
import TabGenres from "../tab-genres/tab-genres.jsx";
import TabMovie from "../tab-movie/tab-movie.jsx";
import {DefaultTab} from "../../const.js";

const Tabs = (props) => {
  const {tabNames, activeTab, onTabClick} = props;

  const getComponentByTabName = () => {
    switch (true) {
      case tabNames.includes(DefaultTab.GENRE || activeTab):
        return <TabGenres {...props}/>;
      case tabNames.includes(DefaultTab.MOVIE || activeTab):
        return <TabMovie {...props}/>;
      default:
        return ``;
    }
  };

  return (
    getComponentByTabName(onTabClick)
  );
};

Tabs.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Tabs;
