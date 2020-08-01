import * as React from "react";
import {Subtract} from "utility-types";

import {START_DELAY} from "../../const";

interface State {
  isPlaying: boolean;
};

interface InjectedProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isPlaying: boolean;
};

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithVideo extends React.PureComponent<T, State> {
    private timer: NodeJS.Timeout;
    constructor(props) {
      super(props);

      this.timer = null;

      this.state = {
        isPlaying: false
      };

      this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
      this._handleMovieCardMouseLeave = this._handleMovieCardMouseLeave.bind(this);
    }

    _handleMovieCardMouseEnter() {
      this.timer = setTimeout(() =>
        this.setState({
          isPlaying: true
        }), START_DELAY);
    }

    _handleMovieCardMouseLeave() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.setState({
          isPlaying: false
        });
        this.timer = null;
      }
    }

    componentWillUnmount() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }

    render() {
      const {isPlaying} = this.state;
      return (
        <Component
          {...this.props}
          onMouseEnter={this._handleMovieCardMouseEnter}
          onMouseLeave={this._handleMovieCardMouseLeave}
          isPlaying={isPlaying}
        />
      );
    }
  }

  return WithVideo;
};

export default withVideo;
