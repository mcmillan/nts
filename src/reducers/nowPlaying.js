// @flow
import { SET_EPISODE, SHOW_MODAL, HIDE_MODAL, PLAY, PAUSE } from '../actions/nowPlaying';
import { NowPlayingState } from '../types';

const initialState: NowPlayingState = {
  showModal: false,
  playing: false,
};

export default (state: NowPlayingState = initialState, action: any) => {
  switch (action.type) {
    case SET_EPISODE:
      return { ...state, episode: action.episode, playing: true };
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    case SHOW_MODAL:
      return { ...state, showModal: true };
    case HIDE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};
