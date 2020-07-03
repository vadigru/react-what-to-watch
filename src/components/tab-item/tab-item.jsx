import React from "react";
import PropTypes from "prop-types";

const TabItem = (props) => {
  const {className, tabName, activeTab, onTabClick} = props;
  return (
    <li className={`${className}item ${activeTab === tabName && `${className}item--active`}`}>
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
  );
};

TabItem.propTypes = {
  className: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default TabItem;
