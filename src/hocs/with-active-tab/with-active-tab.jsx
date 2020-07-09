import React from "react";

import {Tab} from "../../const.js";

const withActiveTab = (Component) => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: Tab.OVERVIEW
      };

      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _handleTabClick(tabName) {
      this.setState({
        activeTab: tabName
      });
    }

    render() {
      const {activeTab} = this.state;

      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onTabClick={this._handleTabClick}
        />
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
