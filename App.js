import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';
import MainMenu from './components/MainMenu'
import DummyChart from './components/DummyChart'
import AddSession from './components/AddSession'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools(middleware))}>
        <View style={{ flex: 1 }}>
          {/* <MainMenu /> */}
          {/* <DummyChart /> */}
          <AddSession />
        </View>
      </Provider>
    );
  }
}
