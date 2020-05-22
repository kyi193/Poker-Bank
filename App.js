import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';
import MainMenu from './components/MainMenu'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
        <View>
          <MainMenu />
        </View>
      </Provider>
    );
  }
}
