import React from "react";
import PropTypes from "prop-types";

import {movieType} from "../../prop-types/types.js";

const VideoPlayerBig = (props) => {
  const {
    onExitButtonClick,
    movie,
    autoPlay,
    isPlaying,
    onPlayButtonClick,
    onFullscreenButtonClick,
    getPlaybackProgress,
    getRemainingTime,
    videoRef,
    onLoadedMetadata,
    onTimeUpdate
  } = props;

  const {videoUrl, backgroundUrl} = movie;
  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoUrl}
        className="player__video"
        poster={backgroundUrl}
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
            <progress className="player__progress" value={getPlaybackProgress()} max="100"></progress>
            <div
              className="player__toggler"
              style={{left: `${getPlaybackProgress()}%`}}
            >
                Toggler
            </div>
          </div>
          <div className="player__time-value">{getRemainingTime()}</div>
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
          <div className="player__name">Transpotting</div>

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
};

VideoPlayerBig.propTypes = {
  movie: movieType.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func,
  getPlaybackProgress: PropTypes.func.isRequired,
  getRemainingTime: PropTypes.func.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ]).isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
};

export default VideoPlayerBig;
