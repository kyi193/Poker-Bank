import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Platform, Alert, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkGray, backgroundGray, pink, limeGreen, offYellow } from '../utils/colors'
import DatePicker from 'react-native-datepicker'
import { Entypo } from '@expo/vector-icons';
import { addSession } from '../actions'
import { generateUID } from '../utils/helpers'
import { connect } from 'react-redux'
import { saveSession } from '../utils/api'
function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Entypo name="squared-plus" size={62} color={limeGreen} />
    </TouchableOpacity>
  )
}
function HomeBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={{ borderWidth: 5, borderRadius: 15, backgroundColor: darkGray, padding: 5 }}
      onPress={onPress}>
      <Entypo name="back" size={35} color={offYellow} />
    </TouchableOpacity>
  )
}

class AddSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      buyIn: null,
      cashOut: null,
      total: null,
    }
  }
  createTwoButtonAlert = () =>
    Alert.alert(
      "Error",
      "Please fill all sections in!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  onChangeBuyIn = (buyIn) => {
    this.setState(() => ({
      buyIn,
    }))
  }
  onChangeCashOut = (cashOut) => {
    this.setState(() => ({
      cashOut,
    }))
  }

  submitCard = () => {
    const { date, buyIn, cashOut } = this.state;
    const { dispatch } = this.props
    const result = cashOut - buyIn
    const sessionID = generateUID()
    if (date.length < 1 || buyIn.length < 1 || cashOut < 1) {
      this.createTwoButtonAlert()
      return
    }
    const sessionInfo = {
      date: date,
      result: result,
    }
    dispatch(addSession(sessionID, sessionInfo))
    saveSession(sessionID, sessionInfo)
  }

  toHome = () => {
    this.props.navigation.navigate('Menu')
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
          centerComponent={{ text: 'Session Details', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <View style={styles.menuContent}>
          <Text style={styles.menuItem}>Date:</Text>
          <DatePicker
            style={{ width: 250, marginBottom: 20 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2000-01-01"
            maxDate="2020-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 35,
                color: 'white'
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          />
          <Text style={styles.menuItem}>Buy-In:</Text>
          <TextInput
            style={{ width: 215, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 25, marginLeft: 35, color: 'white', paddingLeft: 10 }}
            keyboardType='numeric'
            onChangeText={text => this.onChangeBuyIn(text)}
            value={this.state.buyIn}
          />
          <Text style={styles.menuItem}>Cash-Out:</Text>
          <TextInput
            style={{ width: 215, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 25, marginLeft: 35, color: 'white', paddingLeft: 10 }}
            keyboardType='numeric'
            onChangeText={text => this.onChangeCashOut(text)}
            value={this.state.cashOut}
          />
          <View style={{
            flexDirection: "row",
            width: Dimensions.get('window').width,
            justifyContent: 'space-around',
            marginTop: 200,
          }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <HomeBtn
                onPress={this.toHome} />
              <Text style={{ fontSize: 20, color: 'white', marginTop: 10 }}>Return to Home</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <SubmitBtn
                onPress={this.submitCard} />
              <Text style={{ fontSize: 20, color: 'white' }}>Add Session!</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundGray
  },
  menuContent: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    color: 'white',
    fontSize: 30,
    paddingLeft: 10,
    marginBottom: 5,
  },
  menuText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    color: '#d0d0d0',
    justifyContent: 'center',
    alignSelf: 'center'
  },
})
function mapStateToProps(state) {
  const session = Object.keys(state).length + 1
  return {
    session
  }
}
export default connect(mapStateToProps)(AddSession)
