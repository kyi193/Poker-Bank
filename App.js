import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';
import MainMenu from './components/MainMenu'
import Constants from "expo-constants";
import { darkGray } from './utils/colors'


function PokerStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
        <View style={{ flex: 1 }}>
          <PokerStatusBar backgroundColor={darkGray} barStyle="light-content" />
          <MainMenu />
        </View>
      </Provider>
    );
  }
}
