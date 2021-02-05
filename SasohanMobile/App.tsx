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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/home';
import UserScreen from './src/user';
import SearchScreen from './src/search';
import PostScreen from './src/post';

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused: any, name: any) => {
  let iconImagePath;

  if (name === 'Home') {
    iconImagePath = require('./src/pics/home.png');
  } else if (name === 'User') {
    iconImagePath = require('./src/pics/user.png');
  } else if (name === 'Post') {
    iconImagePath = require('./src/pics/post.png');
  } else if (name === 'Search') {
    iconImagePath = require('./src/pics/search.png');
  }

  return (
    <Image
      style={{
        width: focused ? 24 : 20,
        height: focused ? 24 : 20,
      }}
      source={iconImagePath}
    />
  );
};

class App extends Component {
  state = {
    isLoaded: false,
  };

  setAppLoaded = () => {
    this.setState({ isLoaded: true });
  };

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              activeBackgroundColor: 'skyblue',
              activeTintColor: 'blue',
              inactiveTintColor: '#fff',
              style: {
                backgroundColor: '#c6cbef',
              },
            }}
            screenOptions={({ route }: { route: any }) => ({
              tabBarLabel: route.name,
              tabBarIcon: ({ focused }: { focused: any }) =>
                TabBarIcon(focused, route.name),
            })}>
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Post" component={PostScreen} />
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'My home',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTintStyle: {
                  fontWeight: 'bold',
                }
              }}
            />
            <Tab.Screen name="User" component={UserScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({});
export default App;
