/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

interface Props { route: any }
interface State { }

/**
 * Screen showing detailed posts
 */
class EditPostScreen extends Component<Props, State> {
    constructor(props: any){
        super(props);

        this.state = {
            
        }
    }

    render() {
        /**
         * Data to Show Posts
         */
        const title = this.props.route.params.title
        const body = this.props.route.params.body
        const category_id = this.props.route.params.category_id
        const price = this.props.route.params.price

        console.log(title, body, category_id, price)

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.postContainer}>
                        <View>
                            <Text style={styles.postTitle}>
                                {title}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.postContent}>
                                {body}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.postCategory}>
                                {category_id}
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

export default EditPostScreen;
