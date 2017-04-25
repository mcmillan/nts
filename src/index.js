import React from 'react';
import { View, StatusBar } from 'react-native';
import RootNavigator from './navigators/RootNavigator';

export default () => (
  <View style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" />
    <RootNavigator />
  </View>
);
