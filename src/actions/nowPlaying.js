// @flow
import { Episode } from '../types';

export const SET_EPISODE = 'NowPlaying/SetEpisode';
export const SHOW_MODAL = 'NowPlaying/ShowModal';
export const HIDE_MODAL = 'NowPlaying/HideModal';
export const PLAY = 'NowPlaying/Play';
export const PAUSE = 'NowPlaying/Pause';

export const setEpisode = (episode: Episode) => ({
  type: SET_EPISODE,
  episode,
});

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const play = () => ({
  type: PLAY,
});

export const pause = () => ({
  type: PAUSE,
});
