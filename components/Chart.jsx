import { View, StyleSheet, Dimensions } from "react-native"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from "react-native-chart-kit";

export default function Chart(){
    <View
    style={styles.ChartShadow}
  >
    <LineChart
      data={{
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
        datasets: [
          {
            data: [
              Math.random() * 1,
              Math.random() * 1,
              Math.random() * 1,
              Math.random() * 1,
              Math.random() * 1,
              Math.random() * 1,
              Math.random() * 1,
            ],
          },
        ],
      }}
      width={Dimensions.get("window").width - 40} // from react-native
      height={200}
      // yAxisLabel="$"
      yAxisSuffix="Km"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        // backgroundColor: "black",
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgb(252, 193, 41)`,
        labelColor: (opacity = 1) => `rgb(21, 20, 27)`,
        style: {
          borderRadius: 16,
          backgroundColor: "red",
        },
        propsForDots: {
          r: "5",
          strokeWidth: "2",
          stroke: "#FFC329",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        // borderRadius: 16,
      }}
    />
  </View>
}

const styles = StyleSheet.create({
    ChartShadow: {
        marginTop: 20,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        // height: "50%",
        ...Platform.select({
          ios: {
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
          },
          android: {
            elevation: 2,
          },
        }),
        padding: Platform.OS === "ios" ? 8 : 7.5,
      }
})