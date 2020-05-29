import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-native-elements'
import { darkGray, backgroundGray, menuItemGray, limeGreen } from '../utils/colors'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { retrieveSessions } from '../utils/api'
import { receiveSessions } from '../actions'

class MainMenu extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const DEMO_MODE = true
    if (DEMO_MODE) {
      var date = new Date()
      var sessions = {
        0: {
          cumulativeWinnings: 10,
          id: 0,
          result: 0,
          date: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
        }
      }
      for (let i = 1; i < 100; i++) {
        const win = Math.random() <= 0.6 ? true : false
        const percentChange = (Math.random() * .2) + .1
        let result;
        const lastSession = sessions[i - 1]
        if (win) {
          result = lastSession.cumulativeWinnings * percentChange
        } else {
          result = -1 * lastSession.cumulativeWinnings * percentChange
        }
        date.setDate(date.getDate() + 1);
        sessions[i] = {
          cumulativeWinnings: lastSession.cumulativeWinnings + result,
          result: Math.floor(result),
          id: i,
          date: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
        }
      }
      dispatch(receiveSessions(sessions))
    } else {
      retrieveSessions()
        .then(sessions => {
          dispatch(receiveSessions(sessions))
        })
    }
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
          centerComponent={{ text: 'Main Menu', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <View style={styles.menuContent}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Add A Session')}>
            <Text style={styles.menuText}>Add a Session</Text>
            <Entypo
              style={{ alignSelf: 'center' }}
              name="circle-with-plus"
              size={24}
              color='black' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Total Results</Text>
            <Entypo
              style={{ alignSelf: 'center' }}
              name="credit"
              size={24}
              color={limeGreen} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.navigate('Session List')}
          >
            <Text style={styles.menuText}>All sessions</Text>
            <Ionicons
              style={{ alignSelf: 'center' }}
              name="md-list-box"
              size={26}
              color="black" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect()(MainMenu)

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
