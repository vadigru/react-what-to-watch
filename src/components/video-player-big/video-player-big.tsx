import * as React from "react";

import {formatTime} from "../../utils/common";

interface Props {
  videoLink: string;
  videoBackground: string;
  videoTitle: string;
  isPlaying: boolean;
  duration: number;
  progress: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  autoPlay: boolean;
  onPlayButtonClick: () => void;
  onFullscreenButtonClick: () => void;
  onExitButtonClick: () => {};
  onLoadedMetadata: (evt: React.SyntheticEvent<EventTarget>) => void;
  onTimeUpdate: (evt: React.SyntheticEvent<EventTarget>) => void;
}

class VideoPlayerBig extends React.PureComponent<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      autoPlay,
      videoRef,
      duration,
      progress,
      isPlaying,
      videoLink,
      videoBackground,
      videoTitle,
      onPlayButtonClick,
      onFullscreenButtonClick,
      onExitButtonClick,
      onLoadedMetadata,
      onTimeUpdate,
    } = this.props;

    const progressInPct = progress / duration * 100;
    const timeLeft = formatTime(duration - progress);

    return (
      <div className="player">
        <video
          ref={videoRef}
          src={videoLink}
          className="player__video"
          poster={videoBackground}
          width="100%"
          autoPlay={autoPlay}
          onClick={onPlayButtonClick}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
        >
        </video>

        <button
          type="button"
          className="player__exit"
          onClick={onExitButtonClick}>
            Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={`${progressInPct}`} max="100"></progress>
              <div
                className="player__toggler"
                style={{left: `${progressInPct}%`}}
              >
                  Toggler
              </div>
            </div>
            <div className="player__time-value">{timeLeft}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={onPlayButtonClick}
            >
              {isPlaying ? (
                <React.Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </React.Fragment>
              )}
            </button>
            <div className="player__name">{videoTitle}</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={onFullscreenButtonClick}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayerBig;
