/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import UserScreen from '../screens/UserScreen';
import UserPostScreen from '../screens/UserPostScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';

const UserStack = createStackNavigator();

class UserStackScreen extends Component {

    render() {
        return (
            <UserStack.Navigator
                initialRouteName="UserScreen">
                <UserStack.Screen name="UserScreen"
                    component={UserScreen}
                    options={{
                        headerShown: false

                    }}
                />
                <UserStack.Screen name="UserPostScreen" component={UserPostScreen} 
                    options={{
                        headerShown: false
                    }}
                />
                <UserStack.Screen name="DetailPostScreen" component={DetailPostScreen} 
                    options={{
                        headerShown: false
                    }}
                />
                <UserStack.Screen name="EditPostScreen" component={EditPostScreen} 
                    options={{
                        headerShown: false
                    }}
                />
            </UserStack.Navigator>
        )
    }
}

export default UserStackScreen;
