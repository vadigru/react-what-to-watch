import React from "react";
import PropTypes from "prop-types";

const TabItem = (props) => {
  const {tabNames, className, activeTab, onTabClick} = props;

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
  tabName: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default TabItem;
