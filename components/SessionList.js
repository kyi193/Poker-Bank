import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { darkGray, backgroundGray, offYellow } from '../utils/colors'
import SessionDetails from './SessionDetails'
import { AntDesign } from '@expo/vector-icons';

function HomeBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={{ borderWidth: 5, borderRadius: 15, backgroundColor: darkGray, padding: 5 }}
      onPress={onPress}>
      <Entypo name="back" size={35} color={offYellow} />
    </TouchableOpacity>
  )
}

class SessionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataLoaded: false
    }
  }
  toHome = () => {
    this.props.navigation.navigate('Menu')
  }
  render() {
    const { state, sortedSessions } = this.props
    return ((sortedSessions.length > 0)
      ? <View style={styles.container}>
        <Header
          leftComponent={<MaterialCommunityIcons
            name="poker-chip"
            size={30}
            color='white'
          />}
          centerComponent={{ text: 'Sessions', style: { color: '#fff', fontSize: 24 } }}
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
        <FlatList
          contentContainerStyle={styles.sessionBox}
          data={sortedSessions}
          renderItem={({ item }) => (
            <SessionDetails
              date={item.date}
              result={item.result}
              duration={item.duration}
            />)}
          keyExtractor={item => `${item.id}`}
        />
      </View>
      : <View style={{ flex: 1, backgroundColor: backgroundGray }}>
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', marginBottom: 20 }}>Looks like you have no sessions logged in</Text>
          <HomeBtn onPress={this.toHome} />
          <Text style={{ fontSize: 20, color: 'white', marginTop: 10 }}>Return to Home</Text>
        </View>
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
    backgroundColor: backgroundGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sessionBox: {
    width: Dimensions.get('window').width,
    borderBottomWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
  }
})

export default connect(mapStateToProps)(SessionList)
