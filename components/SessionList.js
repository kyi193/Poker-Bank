import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { retrieveSessions } from '../utils/api'
import { receiveSessions } from '../actions'
import { Header } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkGray, backgroundGray, menuItemGray } from '../utils/colors'
import moment from 'moment'

class SessionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataLoaded: false
    }
  }
  componentDidMount() {
    const { dispatch, state } = this.props
    if (Object.keys(state).length < 1) {
      retrieveSessions()
        .then(sessions => dispatch(receiveSessions(sessions)))
        .then(() => {
          this.setState({ dataLoaded: true });
        });
    }
  }
  render() {
    const { state, sortedSessions } = this.props
    console.log("state: ", state)
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<MaterialCommunityIcons
            name="poker-chip"
            size={30}
            color='white'
          />}
          centerComponent={{ text: 'Sessions', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{
            backgroundColor: darkGray,
            justifyContent: 'space-around',
          }} />
        {sortedSessions.length > 0
          ? <View>
            {sortedSessions.map(session =>
              <View
                key={session.id}
                style={styles.sessionBox}>
                <View style={{ justifyContent: 'space-between', backgroundColor: 'black', borderRadius: 5, width: 80 }}>
                  <Text style={styles.infoHeaderDate}>{moment(session.date).format('dddd MMMM D Y').substring(0, 3)} </Text>
                  <Text style={styles.infoHeader}>{moment(session.date).format('MMMM D ')}</Text>
                  <Text style={styles.infoHeader}>{moment(session.date).format('Y ')}</Text>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                  {session.result < 0
                    ? <Text style={styles.negativeResult}>-${session.result * -1}</Text>
                    : <Text style={styles.positiveResult}>+${session.result}</Text>}
                </View>
              </View>)}
          </View>
          : <View>
            <Text>No Sessions Added</Text>
          </View>
        }

      </View>
    )
  }
}

function mapStateToProps(state) {
  const sessions = Object.assign({}, state);
  const sortedSessions = [];

  for (const sessionId in sessions) {
    sortedSessions.push(sessions[sessionId])
  }
  sortedSessions.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return {
    sortedSessions,
    state,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundGray
  },
  infoHeaderDate: {
    fontSize: 25,
    color: 'white',
    marginLeft: 5,
  },
  infoHeader: {
    color: 'white',
    marginLeft: 5,
  },
  negativeResult: {
    color: 'red',
    fontSize: 25,
    marginTop: 10,
    marginRight: 3,
  },
  positiveResult: {
    color: 'green',
    fontSize: 25,
    marginTop: 10,
    marginRight: 3,
  },
  sessionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
  }
})

export default connect(mapStateToProps)(SessionList)
