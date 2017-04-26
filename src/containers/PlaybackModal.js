// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, Platform, Image, View, WebView, Text, TouchableHighlight } from 'react-native';
import { Episode, State } from '../types';
import { hideModal, play, pause } from '../actions/nowPlaying';
import Icon from 'react-native-vector-icons/FontAwesome';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

type PlaybackModalStateProps = {
  visible: boolean,
  episode: Episode,
}

type PlaybackModalDispatchProps = {
  hide: Function,
  updatePlaybackStatus: Function,
}

const mapStateToProps = (state: State): PlaybackModalStateProps => ({
  episode: state.nowPlaying.episode,
  visible: !!state.nowPlaying.episode && state.nowPlaying.showModal,
});

const mapDispatchToProps = (dispatch: Function): PlaybackModalDispatchProps => ({
  hide: () => dispatch(hideModal()),
  updatePlaybackStatus: (status: string) => {
    console.log(status);
    dispatch(status === 'play' ? play() : pause());
  },
});

const mixcloudProxyUrl = (episode: Episode): string => {
  const feedUrl = encodeURIComponent(episode.mixcloudUrl.replace('https://www.mixcloud.com', ''));
  return `https://s3.eu-west-2.amazonaws.com/nts-app/mixcloudProxy.html?mixcloudUrl=${feedUrl}`;
};

// see https://github.com/facebook/react-native/issues/10865#issuecomment-269847703
/* eslint-disable */
const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage: any = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};
/* eslint-enable */

const PlaybackModal = (props: PlaybackModalStateProps & PlaybackModalDispatchProps) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: [
        props.visible ? { translateY: 0 } : { translateY: Dimensions.get('window').height },
      ],
    }}
  >
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View
        style={{
          height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
          paddingTop: STATUSBAR_HEIGHT,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#fff',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Roboto Mono',
            fontSize: 16,
            flex: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            alignSelf: 'center',
            paddingLeft: 32,
          }}
        >
          Now Playing
        </Text>

        <TouchableHighlight
          onPress={props.hide}
          style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}
        >
          <Icon name="times" color="#fff" size={16} />
        </TouchableHighlight>
      </View>
      {props.episode &&
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: props.episode.imageUrl }}
            style={{ aspectRatio: 1.5, resizeMode: 'cover' }}
          />
          <Text style={{ color: '#fff', padding: 10 }}>
            still need to figure out what goes here
          </Text>
        </View>}
      {props.episode && props.episode.mixcloudUrl &&
        <View style={{ height: 60 }}>
          <WebView
            source={{ uri: mixcloudProxyUrl(props.episode) }}
            style={{ height: '100%' }}
            scrollEnabled={false}
            mediaPlaybackRequiresUserAction={false}
            injectedJavaScript={`(${String(patchPostMessageFunction)})();`}
            onMessage={e => props.updatePlaybackStatus(e.nativeEvent.data)}
          />
        </View>}
    </View>
  </View>
);

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackModal);
