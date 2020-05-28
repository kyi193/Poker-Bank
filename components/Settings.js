import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { clearSessions } from '../utils/api'
import { connect } from 'react-redux'
import { clearDeck } from '../actions'
import { blue, white, tomatoRed } from '../utils/colors'


function ClearBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>CLEAR ALL DECKS</Text>
      <Text style={styles.submitBtnText}>(Warning: This is permanent!)</Text>
    </TouchableOpacity>
  )
}
class Settings extends Component {
  clearDeck = () => {
    clearSessions()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40, paddingBottom: 200 }}>Settings</Text>
        <Text style={{ alignSelf: 'start', fontSize: 20, paddingBottom: 5 }}>           Clear All Data</Text>
        <ClearBtn onPress={this.clearDeck} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: tomatoRed,
    padding: 10,
    borderRadius: 7,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 60,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})
export default connect()(Settings)
