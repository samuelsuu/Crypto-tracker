import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'; // You may need to install this package

export default function ChartScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.tradingview.com/markets/cryptocurrencies/' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
