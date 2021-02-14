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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeStackScreen from './HomeStackScreen';
import UserScreen from '../screens/UserScreen';
import SearchScreen from '../screens/SearchScreen';
import PostScreen from '../screens/PostScreen';

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused: any, name: any) => {
    let iconImagePath;

    if (name === 'Home') {
        iconImagePath = require('./../pics/home.png');
    } else if (name === 'User') {
        iconImagePath = require('./../pics/user.png');
    } else if (name === 'Post') {
        iconImagePath = require('./../pics/post.png');
    } else if (name === 'Search') {
        iconImagePath = require('./../pics/search.png');
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

class AllTabBottomStackScreen extends Component {
    state = {
        isLoaded: false,
    };

    setAppLoaded = () => {
        this.setState({ isLoaded: true });
    };

    render() {
        return (
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
                    component={HomeStackScreen}
                />
                <Tab.Screen name="User" component={UserScreen} />
            </Tab.Navigator>

        );
    }
}

const styles = StyleSheet.create({});
export default AllTabBottomStackScreen;
