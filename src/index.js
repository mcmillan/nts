import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { logger } from 'redux-logger';

import RootNavigator from './navigators/RootNavigator';

import NowPlayingBar from './containers/NowPlayingBar';
import PlaybackModal from './containers/PlaybackModal';

import nowPlayingReducer from './reducers/nowPlaying';

const store = createStore(
  combineReducers({
    nowPlaying: nowPlayingReducer,
  }),
  applyMiddleware(logger),
);

export default () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
      <NowPlayingBar />
      <PlaybackModal />
    </View>
  </Provider>
);
