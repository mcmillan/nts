// @flow
import EpisodeListScreen from './EpisodeListScreen';

export default EpisodeListScreen({
  url: 'https://www.nts.live/api/v2/collections/nts-picks',
  title: 'Picks',
  resultTransformation: episode => ({
    id: episode.episode_alias,
    name: episode.name,
    description: episode.description,
    backgroundImageUrl: episode.media.background_medium_large,
  }),
});
