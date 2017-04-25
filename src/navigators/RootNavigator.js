// @flow
import { TabNavigator } from 'react-navigation';
import LiveNavigator from './LiveNavigator';
import NewNavigator from './NewNavigator';
import PicksNavigator from './PicksNavigator';

export default TabNavigator({
  Live: { screen: LiveNavigator },
  Picks: { screen: PicksNavigator },
  New: { screen: NewNavigator },

}, {
  ...TabNavigator.Presets.iOSBottomTabs,
  tabBarOptions: {
    activeTintColor: '#000',
    activeBackgroundColor: '#fff',
    inactiveTintColor: '#fff',
    inactiveBackgroundColor: '#000',
    showIcon: false,
    style: {
      borderTopWidth: 2,
      borderTopColor: '#fff',
    },
    labelStyle: {
      fontSize: 16,
      fontFamily: 'Roboto Mono',
      fontWeight: 'bold',
    },
  },
});
