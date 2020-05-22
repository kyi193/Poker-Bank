import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
class MainMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
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
