import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { darkGray, backgroundGray } from '../utils/colors';
import { Header } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { receiveSessions } from '../actions'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';

function ImportBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

function ClearBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosClearBtn
        : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Clear Text</Text>
    </TouchableOpacity>
  )
}

class ImportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      testWidth: '99%',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ testWidth: '100%' })
    }, 100)
  }

  importSuccessAlert = () =>
    Alert.alert(
      "Success!",
      "Your Data has been imported into the app!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  importFailAlert = () =>
    Alert.alert(
      "Error!",
      "Data is corrupted.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  clearText = () => {
    this.setState(() => ({
      text: '',
    }))
  }
  submitData = () => {
    const { text } = this.state
    const importData = JSON.parse(text)
    const { dispatch } = this.props
    const keys = Object.keys(importData)
    let isDateValid = false
    let isResultValid = false
    let key = keys[0]
    for (let i = 1; i < keys.length; i++) {
      if (keys[i] - key !== 1) {
        this.setState(() => ({
          text: ''
        }))
        this.importFailAlert()
        return
      }
      key = keys[i]
    }
    for (let session in importData) {
      const dateString = importData[session].date
      const dateObj = new Date(dateString)
      const dateObjString = (JSON.stringify(dateObj.toJSON()).slice(0, 11).slice(1))
      isDateValid = dateString === dateObjString
      isResultValid = typeof importData[session].result === 'number'
      if (!isDateValid || !isResultValid) {
        isDatevalid = false
        isResultValid = false
        break
      }
    }
    if (isDateValid && isResultValid) {
      dispatch(receiveSessions(importData))
      this.importSuccessAlert()
    } else {
      this.importFailAlert()
    }
    this.setState(() => ({
      text: ''
    }))
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
          centerComponent={{ text: 'Import Session Data', style: { color: '#fff', fontSize: 24 } }}
          rightComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <AntDesign
              name="back"
              size={30}
              color="#C0C0C0" />
          </TouchableOpacity>}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <Text style={{ marginLeft: 5, fontSize: 18, color: 'white', marginTop: 10 }}>Import Valid JSON content here:</Text>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{
              marginTop: 10,
              borderWidth: 2,
              width: this.state.testWidth,
              height: 200,
              color: 'white',
              borderColor: 'gray'

            }}
            placeholderTextColor='white'
            placeholder="Paste Code Here"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </ScrollView>
        <ClearBtn onPress={this.clearText} />
        <ImportBtn onPress={this.submitData} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 50
  },
  iosClearBtn: {
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
  androidSubmitBtn: {
    backgroundColor: 'blue',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 60,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
})

export default connect()(ImportData)
