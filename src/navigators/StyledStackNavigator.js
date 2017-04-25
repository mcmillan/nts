// @flow
import { StackNavigator } from 'react-navigation';

export default (routes: any, options: any) =>
  StackNavigator(
    routes,
    {
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#000',
          borderBottomColor: '#fff',
          borderBottomWidth: 2,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Roboto Mono',
          fontSize: 16,
          textAlign: 'center',
          alignItems: 'center',
        },
      },
      ...options,
    },
  );
