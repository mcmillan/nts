export type Episode = {
  id: string,
  name: string,
  description: string,
  imageUrl: string,
  backgroundImageUrl: string,
  mixcloudUrl?: string,
}

export type NowPlayingState = {
  episode: Episode,
  showModal: boolean,
  playing: boolean,
}

export type State = {
  nowPlaying: NowPlayingState,
}
