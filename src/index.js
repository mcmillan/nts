import React from 'react';
import { View, StatusBar } from 'react-native';
import RootNavigator from './navigators/RootNavigator';
import PlaybackModal from './containers/PlaybackModal';

export default () => (
  <View style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" />
    <RootNavigator />
    <PlaybackModal />
  </View>
);
