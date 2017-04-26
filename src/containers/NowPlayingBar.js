// @flow
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showModal } from '../actions/nowPlaying';

import type { Episode, State } from '../types';

type NowPlayingBarStateProps = {
  episode?: Episode,
  playing: boolean,
}

type NowPlayingBarDispatchProps = {
  showModal: Function,
}

const mapStateToProps = (state: State): NowPlayingBarStateProps => ({
  episode: state.nowPlaying.episode,
  playing: state.nowPlaying.playing,
});

const mapDispatchToProps = (dispatch: Function): NowPlayingBarDispatchProps => ({
  showModal: () => dispatch(showModal()),
});

const NowPlayingBar = (props: NowPlayingBarStateProps & NowPlayingBarDispatchProps) => {
  if (!props.episode) {
    return <View />;
  }

  return (
    <TouchableHighlight style={{ backgroundColor: '#fff', padding: 14 }} onPress={props.showModal}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Roboto Mono', fontSize: 16, flex: 1, paddingRight: 10 }}>
          {props.episode.name}
        </Text>
        <Icon name={props.playing ? 'pause' : 'play'} color="#000" size={16} />
      </View>
    </TouchableHighlight>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingBar);
