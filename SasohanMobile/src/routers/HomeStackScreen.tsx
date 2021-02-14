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
import { Image, View } from 'react-native';

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
                        headerTitle: (
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                <Image
                                    style={{ width: 200, height: 100 }}
                                    source={require('../pics/Logo.jpg')}
                                />
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <HomeStack.Screen name="DetailPostScreen" component={DetailPostScreen} />
            </HomeStack.Navigator>
        )
    }
}
export default HomeStackScreen;
