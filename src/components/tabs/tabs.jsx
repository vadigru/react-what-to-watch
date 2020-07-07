import React from "react";
import PropTypes from "prop-types";

const TabItem = (props) => {
  const {tabNames, className, activeTab, onTabClick, onGenreTabClick} = props;

  const chooseHandler = (tab) => {
    if (className === `catalog__genres-`) {
      onTabClick(tab);
      onGenreTabClick();
    } else {
      onTabClick(tab);
    }
  };

  return (
    <ul className={`${className}list`}>
      {tabNames.map((tabName, index) => (
        <li key={tabName + index} className={`${className}item ${activeTab === tabName && `${className}item--active`}`}>
          <a
            href="#"
            className={`${className}link`}
            onClick={(evt) => {
              evt.preventDefault();
              onTabClick(tabName);
              chooseHandler(tabName);
            }}
          >
            {tabName}
          </a>
        </li>
      ))}
    </ul>
  );
};

TabItem.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  className: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onGenreTabClick: PropTypes.func || null.isRequired
};

export default TabItem;
