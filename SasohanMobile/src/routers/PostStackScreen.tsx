/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import PostScreen from '../screens/PostScreen';
import WritePostScreen from '../screens/WritePostScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import SearchScreen from '../screens/SearchScreen'
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import {StyleSheet } from 'react-native';


const PostStack = createStackNavigator();

interface Props { navigation: any }
interface State { }

class PostStackScreen extends Component<Props, State> {
    constructor(props: Props){
        super(props)
    }

    
    render() {
        return (
            <PostStack.Navigator
                initialRouteName="PostScreen">
                <PostStack.Screen name="PostScreen"
                    component={PostScreen}
                    options={{
                        headerShown: false
                    }}/>
                <PostStack.Screen name="WritePostScreen" component={WritePostScreen} />
                <PostStack.Screen name="DetailPostScreen" component={DetailPostScreen} />
                <PostStack.Screen name="SearchScreen" component={SearchScreen} 
                    options={{
                        headerShown: false
                    }}
                />
            </PostStack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    writeBtn: {
        paddingRight: 20,
    }
})
export default PostStackScreen;
