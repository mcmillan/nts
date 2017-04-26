// @flow
export type Episode = {
  id: string,
  name: string,
  description: string,
  imageUrl: string,
  backgroundImageUrl: string,
  mixcloudUrl?: string,
  channel?: string,
}

export type NowPlayingState = {
  showModal: boolean,
  playing: boolean,
  episode?: Episode,
}

export type State = {
  nowPlaying: NowPlayingState,
}
