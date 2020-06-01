import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';
import { darkGray, backgroundGray, menuItemGray, limeGreen } from '../utils/colors';
import { Header } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class ImportData extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', testWidth: '99%' };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ testWidth: '100%' })
    }, 100)
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
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <Text style={{ marginLeft: 5, fontSize: 18, color: 'white' }}>Import Valid JSON content here:</Text>
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
              color: 'white'
            }}
            placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </ScrollView>
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
