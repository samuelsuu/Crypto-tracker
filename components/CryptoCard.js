import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function CryptoCard({ coin, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.coinName}>{coin.name}</Text>
        <Text
          style={[
            styles.coinPrice,
            coin.isDropping ? styles.priceDropping : styles.priceNormal,
          ]}
        >
          ${coin.current_price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  coinName: { fontSize: 18, fontWeight: "600", color: "#333" },
  coinPrice: { fontSize: 16, marginTop: 4 },
  priceDropping: { color: "#c43a31" }, // Red color when price is dropping
  priceNormal: { color: "#3a81f6" },   // Blue color for normal price
});
