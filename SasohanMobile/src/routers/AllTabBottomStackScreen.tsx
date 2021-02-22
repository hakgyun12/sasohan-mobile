/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './HomeStackScreen';
import UserScreen from '../screens/UserScreen';
import PostStackScreen from './PostStackScreen';

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused: any, name: any) => {
    let iconImagePath;

    if (name === 'Home') {
        iconImagePath = require('./../pics/home.png');
    } else if (name === 'User') {
        iconImagePath = require('./../pics/user.png');
    } else if (name === 'Post') {
        iconImagePath = require('./../pics/post.png');
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
                    keyboardHidesTabBar: true,
                    activeBackgroundColor: 'skyblue',
                    activeTintColor: 'blue',
                    inactiveTintColor: '#fff',
                    style: {
                        position: 'absolute',
                        backgroundColor: '#c6cbef',
                    },
                }}
                screenOptions={({ route }: { route: any }) => ({
                    tabBarLabel: route.name,
                    tabBarIcon: ({ focused }: { focused: any }) =>
                        TabBarIcon(focused, route.name),
                })}>
                <Tab.Screen name="Post" component={PostStackScreen} />
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
