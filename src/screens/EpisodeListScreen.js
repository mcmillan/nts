// @flow
import React from 'react';
import { View, ListView, Text, Image, TouchableHighlight, RefreshControl } from 'react-native';

type Episode = {
  id: string,
  name: string,
  description: string,
  backgroundImageUrl: string,
}

type EpisodeListScreenConfiguration = {
  url: string,
  title: string,
  resultTransformation: Function,
  fitToHeight?: boolean,
}

export default (config: EpisodeListScreenConfiguration) =>
  class EpisodeListScreen extends React.Component {
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
          renderRow={this.renderRow}
          enableEmptySections
          style={{ backgroundColor: '#000' }}
          contentContainerStyle={containerStyle}
        />
      );
    }

    renderRow(row: Episode) {
      const containerStyle = config.fitToHeight ? { flex: 1 } : { aspectRatio: 1.25 };
      return (
        <TouchableHighlight style={containerStyle}>
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
  };
