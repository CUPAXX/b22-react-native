/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
