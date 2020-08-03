import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/state/state";

import {Movie} from "../../prop-types/types";
import {formatTime} from "../../utils/common";

interface Props {
  id: number;
  movie: Movie;
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
  changeSelectedMovieId: (
    id: string | number
  ) => {
    type: string;
    payload: string;
  };
}

class VideoPlayerBig extends React.PureComponent<Props> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, changeSelectedMovieId} = this.props;
    changeSelectedMovieId(id);
  }

  render() {
    const {
      movie,
      isPlaying,
      duration,
      progress,
      videoRef,
      autoPlay,
      onPlayButtonClick,
      onFullscreenButtonClick,
      onExitButtonClick,
      onLoadedMetadata,
      onTimeUpdate,
    } = this.props;

    const {videoUrl, backgroundUrl} = movie;

    const progressInPct = progress / duration * 100;
    const timeLeft = formatTime(duration - progress);

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
            <div className="player__name">{movie.title}</div>

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

const mapDispatchToProps = (dispatch) => ({
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  }
});

export {VideoPlayerBig};
export default connect(null, mapDispatchToProps)(VideoPlayerBig);
