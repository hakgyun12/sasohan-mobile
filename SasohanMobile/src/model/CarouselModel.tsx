/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inflate } from 'zlib';
import { resolveAny } from 'dns';

type item = {
    postTitle: string;
    postContent: string;
    categoryId: string;
    price: number;
    latitude: number;
    longitude: number;
}

interface Props {
    navigation: any,
    item: item
    isShowingCarousel: boolean
    hideCarousel: () => void;
}
interface State { }

class CarouselModel extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            checkedCarousel: false
        }
    }

    render() {
        return (
            <View
                style={styles.cardContainer}>
                <View>
                    <View>
                        <Text style={styles.titleStyle}>{this.props.item.postTitle}</Text>
                    </View>
                    <View>
                        <Button onPress={() => this.props.hideCarousel} title="X" />
                    </View>
                </View>
                <Text style={styles.contentStyle}>{this.props.item.postContent}</Text>
                <Text style={styles.postStyle}>{this.props.item.latitude}, {this.props.item.longitude}</Text>
                <Button onPress={() => this.props.navigation.navigate('DetailPostScreen', {
                    postTitle: this.props.item.postTitle,
                    postContent: this.props.item.postContent,
                    categoryId: this.props.item.categoryId,
                    price: this.props.item.price,
                })}
                    title="게시물 이동하기" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carousel: {
        position: 'absolute',
        marginBottom: 30,
        marginTop: 470,
    },
    cardContainer: {
        backgroundColor: 'white',
        height: 170,
        width: 310,
        padding: 24,
        borderRadius: 24,
    },
    titleStyle: {
        fontSize: 30,
        color: 'black',
        marginBottom: 5,
    },
    contentStyle: {
        fontSize: 15,
        color: 'black',
        marginBottom: 5,
    },
    postStyle: {
        fontSize: 15,
        color: 'black',
    },
    buttonStyle: {
        height: 50,
        width: 30,
    },
    headerBar: {
        height: 60,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBarText: {
        fontSize: 20,
        color: 'black',
    },
})

export default CarouselModel;
