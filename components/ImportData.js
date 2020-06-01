import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { darkGray, backgroundGray, menuItemGray, limeGreen } from '../utils/colors';
import { Header } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class ImportData extends Component {
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
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <Text>Import Valid JSON content here:</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundGray
  },
})

export default ImportData
