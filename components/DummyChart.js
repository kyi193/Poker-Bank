import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

class DummyChart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Monthly Results</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  500,
                  -474,
                  1324,
                  2840,
                  -1835,
                  683
                ],
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(104, 104, 104, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: .5,
            useShadowColorFromDataset: true // optional
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default DummyChart
