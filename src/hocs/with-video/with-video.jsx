import React from "react";
import {START_DELAY} from "../../const.js";

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent {
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
