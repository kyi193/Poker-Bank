import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { Entypo } from '@expo/vector-icons';
import { darkGray, backgroundGray, menuItemGray, offYellow } from '../utils/colors'

function HomeBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={{ borderWidth: 5, borderRadius: 15, backgroundColor: darkGray, padding: 5 }}
      onPress={onPress}>
      <Entypo name="back" size={35} color={offYellow} />
    </TouchableOpacity>
  )
}

class Graph extends Component {
  toHome = () => {
    this.props.navigation.navigate('Menu')
  }
  render() {
    const { results, label, title } = this.props.route.params
    return ((results.length > 0 && label.length > 0)
      ? (
        <View style={styles.container}>
          <Text style={{ fontSize: 25, color: 'white' }}>{title}</Text>
          <LineChart
            data={{
              labels: label,
              datasets: [
                {
                  data: results,
                }
              ]
            }}
            width={Dimensions.get("window").width}  // from react-native
            height={600}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#08130D",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: .5,
              useShadowColorFromDataset: true,
              propsForDots: {
                r: "1",
                strokeWidth: ".1",
                stroke: "#ffa726"
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}

          />
        </View>
      )
      : (
        <View style={styles.container}>
          <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', marginBottom: 20 }}>Looks like you have no sessions logged in</Text>
          <HomeBtn onPress={this.toHome} />
          <Text style={{ fontSize: 20, color: 'white', marginTop: 10 }}>Return to Home</Text>
        </View>
      ))
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundGray
  }
})
export default Graph
