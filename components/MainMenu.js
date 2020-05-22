import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { darkGray } from '../utils/colors'
class MainMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Main Menu', style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <Text>
          This is the Main Menu
        </Text>
      </View>
    )
  }
}

export default MainMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
