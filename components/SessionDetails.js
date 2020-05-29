import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

function SessionDetails({ date, result }) {
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: 'gray', borderWidth: 2 }}
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
})
export default SessionDetails
