import React from "react";
import PropTypes from "prop-types";
import {Tab} from "../../const";

const Tabs = (props) => {
  const {tabNames, activeTab, onTabClick} = props;

  const getClass = () => Object.values(tabNames).includes(Tab.OVERVIEW) ? `movie-nav__` : `catalog__genres-`;

  const tabClassName = getClass();

  return (
    <React.Fragment>
      {tabNames.map((tabName, index) => (
        <li key={tabName + index} className={`${tabClassName + `item`} ${activeTab === tabName ? tabClassName + `item--active` : ``}`}>
          <a href="#" className={tabClassName + `link`} onClick={onTabClick(tabName)}>{tabName}</a>
        </li>
      ))}
    </React.Fragment>
  );
};

Tabs.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
