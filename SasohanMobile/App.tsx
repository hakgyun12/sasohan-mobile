/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


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
