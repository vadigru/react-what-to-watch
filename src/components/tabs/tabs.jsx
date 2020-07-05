import React from "react";
import PropTypes from "prop-types";
import TabCatalog from "../tab-genres/tab-genres.jsx";
import TabMovie from "../tab-movie/tab-movie.jsx";
import {DefaultTab} from "../../const.js";

const Tabs = (props) => {
  const {tabNames, onTabClick} = props;

  const getComponentByTabName = (tabName, index) => {
    switch (true) {
      case tabNames.includes(DefaultTab.CATALOG):
        return <TabCatalog key={tabName + index} tabName={tabName} {...props}/>;
      case tabNames.includes(DefaultTab.MOVIE):
        return <TabMovie key={tabName + index} tabName={tabName} {...props}/>;
      default:
        return ``;
    }
  };
  return (
    <React.Fragment>
      {tabNames.map((tabName, index) => (
        getComponentByTabName(tabName, index, onTabClick)
      ))}
    </React.Fragment>
  );
};

Tabs.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
