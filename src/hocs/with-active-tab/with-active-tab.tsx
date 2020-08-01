import * as React from "react";
import {Subtract} from "utility-types";

import {Tab} from "../../const";

interface InjectedProps {
  activeTab: string;
};

interface State {
  activeTab: string;
};

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
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
