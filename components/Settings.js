import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { clearSessions } from '../utils/api'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { darkGray, backgroundGray, blue, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { clearSession } from '../actions'
import axios from 'axios';

function ClearBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.clearBtn
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
function ImportDataBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Import Data</Text>
    </TouchableOpacity>
  )
}

class Settings extends Component {
  clearDeck = () => {
    const { dispatch } = this.props
    dispatch(clearSession(null))
    clearSessions()
    this.clearAlert()
  }

  exportData = () => {
    const { state } = this.props

    const data = {
      export_data: Object.assign({}, state),
      send_to_email: 'kevin.yi93@gmail.com'
    }

    axios.post('https://poker-bank-api.herokuapp.com/data_exports', data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clearAlert = () =>
    Alert.alert(
      "You got it!",
      "Your data has been cleared.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<MaterialCommunityIcons
            name="poker-chip"
            size={30}
            color='white'
          />}
          centerComponent={{ text: 'Settings', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <View style={{ marginTop: 20 }}>
          <ExportDataBtn onPress={this.exportData} />
          <ImportDataBtn onPress={() => this.props.navigation.navigate('Import')} />
          <ClearBtn onPress={this.clearDeck} />
        </View>
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
    backgroundColor: darkGray,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    borderRadius: 7,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  clearBtn: {
    backgroundColor: '#B22222',
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    borderRadius: 7,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
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
