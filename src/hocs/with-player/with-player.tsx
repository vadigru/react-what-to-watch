import * as React from "react";
import {Subtract} from "utility-types";

// import PropTypes from "prop-types";

import {Movie} from "../../prop-types/types";
import {formatTime} from "../../utils/common";

interface Props {
  id: number;
  movie: Movie;
  autoPlay: boolean;
  onExitButtonClick: () => void;
};

interface InjectedProps {
  isPlaying: boolean;
  onPlayButtonClick: () => {};
  onFullscreenButtonClick: () => {};
  getPlaybackProgress: () => {};
  getRemainingTime: () => {};
  videoRef: React.RefObject<HTMLVideoElement>;
  onExitButtonClick: () => void;
  onLoadedMetadata: (evt: React.SyntheticEvent<EventTarget>) => void;
  onTimeUpdate: (evt: React.SyntheticEvent<EventTarget>) => void;
  id: number;
};

interface State {
  isPlaying: boolean,
  videoDuration: number,
  currentTime: number;
};

const withPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithPlayer extends React.PureComponent<T, State>  {
    private videoRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        videoDuration: 0,
        currentTime: 0
      };

      this._handleVideoPlay = this._handleVideoPlay.bind(this);
      this._handleFullscreen = this._handleFullscreen.bind(this);
      this._getPlaybackProgress = this._getPlaybackProgress.bind(this);
      this._getRemainingTime = this._getRemainingTime.bind(this);
      this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
      this._handleLoadedMetadata = this._handleLoadedMetadata.bind(this);
    }

    componentDidMount() {
      const video = this.videoRef.current;
      if (video) {
        video.muted = false;
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;
      if (video) {
        video.muted = null;
      }
    }

    _handleVideoPlay() {
      const video = this.videoRef.current;
      if (video.paused) {
        video.play();
        this.setState({isPlaying: true});
      } else {
        video.pause();
        this.setState({isPlaying: false});
      }
    }

    _handleFullscreen() {
      const video = this.videoRef.current;
      video.requestFullscreen();
    }

    _getPlaybackProgress() {
      return String((this.state.currentTime / this.state.videoDuration) * 100);
    }

    _getRemainingTime() {
      return formatTime(this.state.videoDuration - this.state.currentTime);
    }

    _handleTimeUpdate(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime)
      });
    }

    _handleLoadedMetadata(evt) {
      this.setState({
        isPlaying: this.props.autoPlay,
        videoDuration: Math.floor(evt.target.duration)
      });
    }

    render() {
      const {onExitButtonClick, id} = this.props;
      const {isPlaying} = this.state;
      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handleVideoPlay}
          onFullscreenButtonClick={this._handleFullscreen}
          getPlaybackProgress={this._getPlaybackProgress}
          getRemainingTime={this._getRemainingTime}
          videoRef={this.videoRef}
          onExitButtonClick={onExitButtonClick}
          onLoadedMetadata={this._handleLoadedMetadata}
          onTimeUpdate={this._handleTimeUpdate}
          id={id}
        />
      );
    }
  }

  // WithPlayer.propTypes = {
  //   id: PropTypes.number.isRequired,
  //   movie: movieType.isRequired,
  //   autoPlay: PropTypes.bool.isRequired,
  //   onExitButtonClick: PropTypes.func.isRequired,
  // };

  return WithPlayer;
};

export default withPlayer;
