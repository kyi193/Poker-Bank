import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
class TotalSummary extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <Text>
          This is the Summary Page
        </Text>
      </View>
    )
  }
}

export default connect()(TotalSummary)
