import React from 'react';
import { Dimensions, Platform, View, WebView, Text, TouchableHighlight } from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class PlaybackModal extends React.Component {
  state = {
    showModal: true,
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [
            this.state.showModal ? { translateY: 0 } : { translateY: Dimensions.get('window').height },
          ],
        }}
      >
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <View
            style={{
              height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
              paddingTop: STATUSBAR_HEIGHT,
              flexDirection: 'row',
              alignItems: 'center',
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
                paddingLeft: 50,
              }}
            >
              Now Playing
            </Text>

            <TouchableHighlight
              onPress={() => this.close()}
              style={{ width: 50, paddingRight: 10 }}
            >
              <Text style={{ color: '#fff', fontFamily: 'Roboto Mono', textAlign: 'right' }}>x</Text>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 1 }}>
            {/* @todo */}
          </View>
          <View style={{ height: 60 }}>
            <WebView
              source={require('../mixcloudProxy.html')} // eslint-disable-line global-require
              style={{ height: '100%' }}
              scrollEnabled={false}
              mediaPlaybackRequiresUserAction={false}
            />
          </View>
        </View>
      </View>
    );
  }
}
