// @flow
import EpisodeListScreen from './EpisodeListScreen';

export default EpisodeListScreen({
  url: 'https://www.nts.live/api/v2/live',
  title: 'Live',
  resultTransformation: show => ({
    id: show.now.embeds.details.show_alias,
    name: show.now.embeds.details.name,
    description: show.now.embeds.details.description,
    imageUrl: show.now.embeds.details.media.picture_medium_large,
    backgroundImageUrl: show.now.embeds.details.media.background_medium_large,
    channel: show.channel_name,
  }),
  fitToHeight: true,
});
