/**
 * Sasohan React Native App
 *
 *
 * @format
 * @flow strict-local
 */
import PostScreen from '../screens/PostScreen';
import WritePostScreen from '../screens/WritePostScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, View, Button, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeStack = createStackNavigator();

interface Props { navigation: any }
interface State { }

class PostStackScreen extends Component<Props, State> {
    render() {
        return (
            <HomeStack.Navigator
                initialRouteName="PostScreen">
                <HomeStack.Screen name="PostScreen"
                    component={PostScreen}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.writeBtn}
                                onPress={() => this.props.navigation.navigate('WritePostScreen')}
                            >
                                <Text>게시물 작성</Text>
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                        },
                        headerTintColor: 'white',
                    }} />
                <HomeStack.Screen name="WritePostScreen" component={WritePostScreen} />
            </HomeStack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    writeBtn: {
        paddingRight: 20,
    }
})
export default PostStackScreen;
