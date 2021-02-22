/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import MapScreen from '../screens/MapScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';

const HomeStack = createStackNavigator();

class HomeStackScreen extends Component {
    render() {
        return (
            <HomeStack.Navigator
                initialRouteName="Map">
                <HomeStack.Screen name="Map"
                    component={MapScreen}
                    options={{
                        header: () => null,
                    }} />
                <HomeStack.Screen name="DetailPostScreen" component={DetailPostScreen} />
            </HomeStack.Navigator>
        )
    }
}
export default HomeStackScreen;
