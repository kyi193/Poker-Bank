import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { backGroundGray, backgroundGray } from '../utils/colors'

class Graph extends Component {
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
              useShadowColorFromDataset: true // optional
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
          <Text>Looks like you have no sessions logged in</Text>
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
