import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function CryptoChart({ selectedCoin }) {
  const chartData = selectedCoin.sparkline_in_7d.price;

  return (
    <>
      <Text style={styles.chartTitle}>Price Chart ({selectedCoin.name})</Text>
      {chartData.length > 0 && (
        <LineChart
          data={{
            labels: chartData.map((_, index) => (index % 10 === 0 ? index.toString() : "")),
            datasets: [{ data: chartData }],
          }}
          width={screenWidth - 32}
          height={250}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#F5F5F5", // Softer gradient for the background
            backgroundGradientTo: "#e0e0e0", // Lighter gradient to add depth
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(58, 129, 246, ${opacity})`, // Blue color for the line
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Dark text color for labels
            propsForDots: {
              r: "5", // Bigger dots
              strokeWidth: "2", // Thicker stroke around dots
              stroke: "#3a81f6", // Matching stroke color to the line
            },
            propsForHorizontalLabels: {
              fontSize: 10, // Smaller font size for labels to improve clarity
              fontWeight: "600",
            },
            propsForVerticalLabels: {
              fontSize: 12, // Better font size for vertical axis
              fontWeight: "600",
            },
            style: {
              borderRadius: 8, // Rounded corners for the chart
            },
            gridLines: {
              drawOnChartBackground: true, // Enable grid lines for a better view of the graph
              color: "#e0e0e0", // Soft grid line color
              borderWidth: 1,
            },
            gridStep: 1, // Set the grid step to make it easier to read
            backgroundColor: "#f0f0f0",
          }}
          bezier // Smooth lines for a nicer curve
          style={styles.chart}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
    color: "#333", // Darker title for better contrast
  },
  chart: {
    borderRadius: 10,
    padding: 10, // Padding around the chart to avoid the text touching the edges
    marginBottom: 20, // Adding space below the chart for neatness
  },
});
