import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Platform, Alert, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkGray, backgroundGray, menuItemGray, limeGreen } from '../utils/colors'
import DatePicker from 'react-native-datepicker'

class AddSession extends Component {
  constructor(props) {
    super(props)
    this.state = { date: '' }
  }
  render() {
    console.debug("THE DATE: ", this.state.date)
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
            style={{ width: 250 }}
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

export default AddSession
