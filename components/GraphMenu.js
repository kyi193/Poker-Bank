import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { darkGray, backgroundGray, menuItemGray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from 'moment'

class GraphMenu extends Component {
  render() {
    const { sortedSessions } = this.props
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
            onPress={() => this.props.navigation.navigate('Graph',
              {
                results: sortedSessions.map((session) => session.cumulativeWinnings),
                label: Object.keys(sortedSessions).map((index) => parseInt(index) + 1),
                title: "Results by Session"
              })}>
            <MaterialIcons name="format-list-numbered" size={30} color="black" />
            <Text style={styles.menuText}>Chart by Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Graph',
              {
                results: sortedSessions.map((session) => session.cumulativeWinnings),
                label: sortedSessions.map((session) => moment(session.date).format('MMMM ').substring(0, 3)),
                title: "Results by Date"
              })}>
            <AntDesign name="calendar" size={30} color="black" />
            <Text style={styles.menuText}>Chart by Date</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const sessions = Object.assign({}, state);
  const sortedSessions = [];
  if (Object.keys(state).length > 0) {
    for (const sessionId in sessions) {
      sortedSessions.push(sessions[sessionId])
    }
    sortedSessions.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    sortedSessions[0].cumulativeWinnings = sortedSessions[0].result
    for (let i = 1; i < sortedSessions.length; i++) {
      sortedSessions[i].cumulativeWinnings = sortedSessions[i].result + sortedSessions[i - 1].cumulativeWinnings
    }
  }
  return {
    sortedSessions,
    state,
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
