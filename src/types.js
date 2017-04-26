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
  NowPlayingState: boolean,
}

export type State = {
  nowPlaying: NowPlayingState,
}
