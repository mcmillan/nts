// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, ListView, Text, Image, TouchableHighlight, RefreshControl } from 'react-native';
import { setEpisode } from '../actions/nowPlaying';

import type { Episode } from '../types';

type EpisodeListScreenConfiguration = {
  url: string,
  title: string,
  resultTransformation: Function,
  fitToHeight?: boolean,
}

type EpisodeListScreenProps = {
  play: Function,
}

export default (config: EpisodeListScreenConfiguration) => {
  const mapDispatchToProps = (dispatch: Function) => ({
    play: (episode: Episode) => dispatch(setEpisode(episode)),
  });

  class EpisodeListScreen extends React.PureComponent<void, EpisodeListScreenProps, any> {
    static propTypes = {
      play: React.PropTypes.func.isRequired,
    }

    static navigationOptions = {
      title: config.title,
    }

    dataSource = new ListView.DataSource({
      rowHasChanged: (r1: Episode, r2: Episode) => r1.id !== r2.id,
    })

    state = {
      episodes: this.dataSource.cloneWithRows([]),
      refreshing: false,
    }

    componentDidMount() {
      this.load();
    }

    refresh() {
      this.setState({ refreshing: true });
      this.load();
    }

    async load() {
      const response = await fetch(config.url); //eslint-disable-line
      const json = await response.json();

      this.setState({
        episodes: this.dataSource.cloneWithRows(json.results.map(config.resultTransformation)),
        refreshing: false,
      });
    }

    render() {
      const containerStyle = config.fitToHeight ? {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
      } : {};
      return (
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
              tintColor="#fff"
            />
          }
          dataSource={this.state.episodes}
          renderRow={row => this.renderRow(row)}
          enableEmptySections
          style={{ backgroundColor: '#000' }}
          contentContainerStyle={containerStyle}
        />
      );
    }

    renderRow(row: Episode) {
      const containerStyle = config.fitToHeight ? { flex: 1 } : { aspectRatio: 1.25 };
      return (
        <TouchableHighlight style={containerStyle} onPress={() => this.props.play(row)}>
          <Image style={{ flex: 1, justifyContent: 'flex-end', resizeMode: 'cover', padding: 15 }} source={{ uri: row.backgroundImageUrl }}>
            <View style={{ backgroundColor: '#000', borderColor: '#fff', borderWidth: 2, paddingHorizontal: 8, paddingVertical: 4 }}>
              <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto Mono', fontWeight: 'bold' }}>{row.name}</Text>
              {row.description &&
                <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Roboto Mono' }}>{row.description}</Text>}
            </View>
          </Image>
        </TouchableHighlight>
      );
    }
  }

  return connect(undefined, mapDispatchToProps)(EpisodeListScreen);
};
