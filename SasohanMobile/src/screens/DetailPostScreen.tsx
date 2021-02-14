/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import MapScreen from '../screens/MapScreen'
import React, { Component } from 'react';
import { View, Text, Button, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface Props { route: any }
interface State { }

/**
 * Screen showing detailed posts
 */
class DetailPostScreen extends Component<Props, State> {

    render() {
        /**
         * Data to Show Posts
         */
        const postTitle = this.props.route.params.postTitle
        const postContent = this.props.route.params.postContent
        const categoryId = this.props.route.params.categoryId
        const price = this.props.route.params.price

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.postContainer}>
                        <View>
                            <Text style={styles.postTitle}>
                                {postTitle}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.postContent}>
                                {postContent}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.postCategory}>
                                {categoryId}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.postPrice}>
                                {price}
                            </Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    postContainer: {
        padding: 10,
    },
    postTitle: {
        fontSize: 50,
        color: 'black',
    },
    postContent: {
        fontSize: 40,
        color: 'black',
    },
    postCategory: {
        fontSize: 20,
    },
    postPrice: {
        fontSize: 20,
    }
})

export default DetailPostScreen;
