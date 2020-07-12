import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { darkGray, backgroundGray, menuItemGray, limeGreen, lightGray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Header } from 'react-native-elements'
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

class TotalSummary extends Component {
  render() {
    const { totalHours, cumulativeWinnings, sessionsWon, sessions, hourlyRate, hourPerSession, percentWon } = this.props
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<MaterialCommunityIcons
            name="poker-chip"
            size={30}
            color='white'
          />}
          centerComponent={{ text: 'Report', style: { color: '#fff', fontSize: 24 } }}
          rightComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <AntDesign
              name="back"
              size={30}
              color="#C0C0C0" />
          </TouchableOpacity>}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        <View style={styles.sessionDetail}>
          <Text style={styles.sessionDetailTitle}>Total Profit/Loss</Text>
          {cumulativeWinnings > 0
            ? <Text style={styles.totalProfit}>+${formatNumber(cumulativeWinnings)}</Text>
            : <Text style={styles.totalNegativeProfit}>-${formatNumber(cumulativeWinnings * -1)}</Text>}
        </View>
        <View style={styles.sessionDetail}>
          <Text style={styles.sessionDetailTitle}>Hourly Rate</Text>
          {hourlyRate > 0
            ? <Text style={styles.totalProfit}>+${formatNumber(hourlyRate)}/hr</Text>
            : <Text style={styles.totalNegativeProfit}>-${formatNumber(hourlyRate * -1)}/hr</Text>}
        </View>
        <View style={styles.sessionDetail}>
          <Text style={styles.sessionDetailTitle}>$/Session</Text>
          {hourPerSession > 0
            ? <Text style={styles.totalProfit}>+${formatNumber(hourPerSession)}</Text>
            : <Text style={styles.totalNegativeProfit}>-${formatNumber(hourPerSession * -1)}</Text>}
        </View>
        <View style={styles.sessionDetail}>
          <Text style={styles.sessionDetailTitle}>Duration</Text>
          <Text style={styles.noColor}>{formatNumber(totalHours)} hr(s)</Text>
        </View>
        <View style={styles.sessionDetail}>
          <Text style={styles.sessionDetailTitle}>Cashed</Text>
          <Text style={styles.noColor}>{formatNumber(sessionsWon)}/{formatNumber(sessions)} ({formatNumber(percentWon)}%)</Text>
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
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, .5)',
    height: 70,
    borderBottomWidth: 3,
  },
  totalProfit: {
    fontSize: 25,
    color: 'green'
  },
  totalNegativeProfit: {
    fontSize: 25,
    color: 'red'
  },
  noColor: {
    fontSize: 25,
  },
  sessionDetailTitle: {
    fontSize: 25,
    marginLeft: 5,
  }
})

function mapStateToProps(state) {
  if (Object.keys(state).length !== 0) {
    const sessions = Object.assign({}, state);
    let totalHours = 0;
    let sessionsWon = 0;
    const sortedSessions = [];
    let cumulativeWinnings = 0
    for (const sessionId in sessions) {
      if (sessions[sessionId].result >= 0) {
        sessionsWon += 1
      }
      totalHours += sessions[sessionId].duration
      sortedSessions.push(sessions[sessionId])
      cumulativeWinnings += sessions[sessionId].result
    }
    sortedSessions.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    })
    const hourlyRate = (cumulativeWinnings / totalHours).toFixed(2)
    const hourPerSession = (cumulativeWinnings / sortedSessions.length).toFixed(2)
    const percentWon = (((sessionsWon / sortedSessions.length)) * 100).toFixed()
    return {
      totalHours,
      cumulativeWinnings,
      sessions: sortedSessions.length,
      sessionsWon,
      hourlyRate,
      hourPerSession,
      percentWon,
    }
  } else {
    return {
      totalHours: 0,
      cumulativeWinnings: 0,
      sessions: 0,
      sessionsWon: 0,
      hourlyRate: 0,
      hourPerSession: 0,
      percentWon: 0,
    }
  }
}
export default connect(mapStateToProps)(TotalSummary)
