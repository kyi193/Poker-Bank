import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { darkGray, backgroundGray, menuItemGray, offYellow } from '../utils/colors'
import moment from 'moment'


function SessionDetails({ date, result }) {
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: 'gray', borderWidth: 2 }}
    // key={session.id}
    >
      <View style={{ justifyContent: 'row', backgroundColor: 'black', borderRadius: 5, width: 100 }}>
        <Text style={styles.infoHeaderDate}>{moment(date).format('dddd MMMM D Y').substring(0, 3)} </Text>
        <Text style={styles.infoHeader}>{moment(date).format('MMMM D ')}</Text>
        <Text style={styles.infoHeader}>{moment(date).format('Y ')}</Text>
      </View>
      <View>
        {result < 0
          ? <Text style={styles.negativeResult}>-${result * -1}</Text>
          : <Text style={styles.positiveResult}>+${result}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundGray,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 30,
    marginTop: 10,
    marginRight: 3,
  },
  positiveResult: {
    color: 'green',
    fontSize: 30,
    marginTop: 10,
    marginRight: 3,
  },
  sessionBox: {
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
  }
})
export default SessionDetails
