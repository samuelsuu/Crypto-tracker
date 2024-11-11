import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; // Your existing HomeScreen component
import ChartScreen from './screens/ChartScreen'; // The new screen with TradingView chart

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chart" component={ChartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
