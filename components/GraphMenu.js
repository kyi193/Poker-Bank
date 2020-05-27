import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { darkGray, backgroundGray, menuItemGray, limeGreen } from '../utils/colors'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Graph from './Graph';

class GraphMenu extends Component {
  render() {
    const { sortedBySession, sortedByDate, results } = this.props
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<MaterialCommunityIcons
            name="poker-chip"
            size={30}
            color='white'
          />}
          centerComponent={{ text: 'Graphs', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <View style={styles.menuContent}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Graph', { results: results, label: sortedBySession, title: "Results by Session" })}>
            <Text style={styles.menuText}>Chart by Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Graph', { results: results, label: sortedByDate, title: "Results by Date" })}>
            <Text style={styles.menuText}>Chart by Date</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const sessions = state;
  const sortedBySession = [];
  const sortedByDate = [];
  const results = [];

  for (const session in sessions) {
    results.push(sessions[session].result)
  }
  //create a list of arrays of arrays each containing id and either session # or date
  for (const session in sessions) {
    sortedBySession.push(sessions[session].session)
  }
  for (const session in sessions) {
    sortedByDate.push(sessions[session].date)
  }
  sortedBySession.sort(function (a, b) {
    return a - b;
  });
  sortedByDate.sort(function (a, b) {
    return new Date(a) - new Date(b);
  });

  return {
    sortedByDate,
    sortedBySession,
    results,
  }
}
export default connect(mapStateToProps)(GraphMenu)

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
    justifyContent: 'center',
    alignItems: 'center'
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
