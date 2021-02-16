/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

type item = {
    postTitle: string;
    postContent: string;
    categoryId: string;
    price: number;
    latitude: number;
    longitude: number;
}

interface Props {
    item: item
    hideCarousel: () => void
    ClicktoMoveDetailScreen: () => void
}

class CarouselModel extends Component<Props> {
    constructor(props: any){
        super(props);
    }

    render() {
        return (
            <View style = {{position: 'absolute'}}>
               <View style={styles.cardContainer}>
                   <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardTitle}>
                                {this.props.item.postTitle}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.cardCategory}>
                                {this.props.item.categoryId}
                            </Text>
                        </View>
                        <View style={styles.cardCloseBtn}>
                            <Button onPress={this.props.hideCarousel} title="X" />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.cardContent}>
                            {this.props.item.postContent}
                        </Text>
                    </View>
                    <View>
                        <Button onPress={this.props.ClicktoMoveDetailScreen} title="게시물 이동하기"/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        height: 170,
        width: 310,
        padding: 24,
        borderRadius: 24,
    },
    cardHeader: {
        flexDirection: 'row',
    },
    cardTitle: {
        fontSize: 30,
        color: 'black',
    },
    cardCloseBtn: {
        marginLeft: 60,
    },
    cardCategory: {
        marginLeft: 30,
        marginTop: 15,
    },
    cardContent: {
        fontSize: 15,
        color: 'black',
        height: 60,
        width: 200,
    },
})

export default CarouselModel;
