import * as React from "react";
import {Subtract} from "utility-types";

interface Props {
  autoPlay: boolean;
  onExitButtonClick: () => void;
}

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
}

interface State {
  isPlaying: boolean;
  videoDuration: number;
  currentTime: number;
}

const withPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        videoDuration: 0,
        currentTime: 0,
      };

      this._handleVideoPlay = this._handleVideoPlay.bind(this);
      this._handleFullscreen = this._handleFullscreen.bind(this);
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

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (document.fullscreenElement) {
        video.controls = true;
      }
      if (!document.fullscreenElement) {
        video.controls = false;
      }
    }

    _handleVideoPlay() {
      const video = this.videoRef.current;
      if (!document.fullscreenElement) {
        if (video.paused) {
          video.play();
          this.setState({isPlaying: true});
        } else {
          video.pause();
          this.setState({isPlaying: false});
        }
      }
    }

    _handleFullscreen() {
      const video = this.videoRef.current;
      video.requestFullscreen();
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
      const {onExitButtonClick} = this.props;
      const {isPlaying, videoDuration, currentTime} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          duration={videoDuration}
          progress={currentTime}
          videoRef={this.videoRef}
          onPlayButtonClick={this._handleVideoPlay}
          onFullscreenButtonClick={this._handleFullscreen}
          onExitButtonClick={onExitButtonClick}
          onLoadedMetadata={this._handleLoadedMetadata}
          onTimeUpdate={this._handleTimeUpdate}
        />
      );
    }
  }

  return WithPlayer;
};

export default withPlayer;
