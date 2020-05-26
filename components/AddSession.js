import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Platform, Alert, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkGray, backgroundGray, menuItemGray, limeGreen } from '../utils/colors'

class AddSession extends Component {
  render() {
    return (
      <View>
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
        <Text>This is the Add Session Page</Text>
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
    width: Dimensions.get('window').width,
    borderColor: 'black',
    backgroundColor: menuItemGray,
    borderRadius: 5,
    borderWidth: 2,
    height: 80,
    margin: 20,
  },
  menuText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    color: '#d0d0d0',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default AddSession
