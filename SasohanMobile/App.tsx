/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import AllTabBottomStackScreen from './src/routers/AllTabBottomStackScreen';


class App extends Component {

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AllTabBottomStackScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({});
export default App;
