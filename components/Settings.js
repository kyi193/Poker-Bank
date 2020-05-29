import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { clearSessions, exportEmail } from '../utils/api'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { darkGray, backgroundGray, menuItemGray, limeGreen, tomatoRed, blue, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { clearSession } from '../actions'

function ClearBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>CLEAR SESSIONS</Text>
      <Text style={styles.submitBtnText}>(Warning: This is permanent!)</Text>
    </TouchableOpacity>
  )
}

function ExportDataBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Export Data</Text>
    </TouchableOpacity>
  )
}

function ClearedBtn() {
  return (
    <View
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn}
    >
      <Text style={styles.submitBtnText}>Sessions Cleared</Text>
    </View>
  )
}
class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clearToggle: false
    }
  }
  clearDeck = () => {
    const { dispatch } = this.props
    dispatch(clearSession(null))
    clearSessions()
    this.setState(() => ({
      clearToggle: true
    }))
  }

  exportData = () => {

  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<MaterialCommunityIcons
            name="poker-chip"
            size={30}
            color='white'
          />}
          centerComponent={{ text: 'Main Menu', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <Text style={{ alignSelf: 'start', fontSize: 20, paddingBottom: 5, color: 'white', marginTop: 20 }}>           Clear All Data</Text>
        {this.state.clearToggle === false
          ? <ClearBtn onPress={this.clearDeck} />
          : <ClearedBtn />}
        <ExportDataBtn onPress={this.exportData} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: backgroundGray
  },
  iosSubmitBtn: {
    backgroundColor: 'red',
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

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(Settings)
