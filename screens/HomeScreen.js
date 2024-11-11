// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ToastAndroid } from 'react-native';
import axios from 'axios';
import CryptoCard from '../components/CryptoCard'; // Make sure this component is correctly defined
import CryptoChart from '../components/CryptoChart'; // Make sure this component is correctly defined

export default function HomeScreen() {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [previousPrices, setPreviousPrices] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: true,
        },
      });

      const updatedData = response.data.map((coin) => {
        const previousPrice = previousPrices[coin.id] || coin.current_price;
        const isDropping = coin.current_price < previousPrice;
        return { ...coin, isDropping };
      });

      setCryptoData(updatedData);
      const updatedPrices = response.data.reduce((acc, coin) => {
        acc[coin.id] = coin.current_price;
        return acc;
      }, {});
      setPreviousPrices(updatedPrices);
      setLastUpdated(new Date().toLocaleTimeString());

      ToastAndroid.show('Prices updated!', ToastAndroid.SHORT);

      if (response.data.length > 0 && !selectedCoin) {
        setSelectedCoin(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cryptocurrency Prices</Text>
      {cryptoData.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} onPress={() => setSelectedCoin(coin)} />
      ))}
      {lastUpdated && <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>}
      {selectedCoin && <CryptoChart selectedCoin={selectedCoin} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 },
  lastUpdated: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 10 },
});
