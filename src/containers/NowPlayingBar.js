// @flow
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { showModal } from '../actions/nowPlaying';
import { Episode, State } from '../types';

type NowPlayingBarStateProps = {
  episode: Episode,
}

type NowPlayingBarDispatchProps = {
  showModal: Function,
}

const mapStateToProps = (state: State) => ({
  episode: state.nowPlaying.episode,
});

const mapDispatchToProps = (dispatch: Function) => ({
  showModal: () => dispatch(showModal()),
});

const NowPlayingBar = (props: NowPlayingBarStateProps & NowPlayingBarDispatchProps) => {
  if (!props.episode) {
    return <View />;
  }

  return (
    <TouchableHighlight style={{ backgroundColor: '#fff', padding: 14 }} onPress={props.showModal}>
      <Text style={{ fontFamily: 'Roboto Mono', fontSize: 14 }}>
        {props.episode.name}
      </Text>
    </TouchableHighlight>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingBar);
