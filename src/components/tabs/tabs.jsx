import React from "react";
import PropTypes from "prop-types";

const Tabs = (props) => {
  const {tabNames, activeTab, onTabClick} = props;

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {tabNames.map((tabName, index) => (
            <li key={tabName + index} className={`movie-nav__item ${activeTab === tabName ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={onTabClick(tabName)}>{tabName}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Tabs.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
