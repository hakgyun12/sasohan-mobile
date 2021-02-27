/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert, ScrollView, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const category_props = [
    {label: 'Housework', value: 0},
    {label: 'Errands', value: 1},
    {label: 'Housework', value: 2},
    {label: 'Put In/Repair', value: 3},
    {label: 'Other', value: 4},       
]

class WritePostScreen extends Component {
    state = {
        postTitle: "",
        postContent: "",
        postPrice: 0,
        postCategory: "",
    };

    titleHandleText = (text: string) => {
        this.setState({ postTitle: text });
    }

    contentHandleText = (text: string) => {
        this.setState({ postContent: text });
    }

    priceHandleText = (price: string) => {
        this.setState({ postPrice: parseInt(price, 10) });
    }

    clickSaveBtn = () => {
        const chkTitle = function(str: string) {
            var regNm = /^[0-9a-zA-Z]{2, 20}$/; 
            return regNm.test(str) ? true : false;
        };

        const chkContent = function(str: string) {
            var regNm = /^[0-9a-zA-Z]{2, 40}$/; 
            return regNm.test(str) ? true : false;
        }

        const chkPrice = function(int: string) {
            var regExp = /^[0-9]+$/;
            return regExp.test(int) ? true : false;
        }

        const chkCategory = function(str: string) {
            for(var i = 0; i< 4;){
                if(str === category_props[i].label){
                    i++;
                }else{
                    return false;
                }
            }
        }

        /**
         * 1. 제목 유효성 검사
         * 2. 내용 유효성 검사
         * 3. 가격 유효성 검사
         * 4. 카테고리 유효성 검사
         * 5. 1~4 항목 True -> DB 저장, match 알고리즘
         */
        if(chkTitle(this.state.postTitle) == false){
            Alert.alert("Title is false");
        }else if(chkContent(this.state.postContent) == false){
            Alert.alert("Content is false");
        }else if(chkPrice(this.state.postPrice.toString()) == false) {
            Alert.alert("Price is false");
        }else if(chkCategory(this.state.postCategory) == false){
            Alert.alert("Category is false");
        }else{
            const rws = new WebSocket("ws://{server_domain}:1324/connect");

            //소켓 연결 시 서버에 id 메시지 전송
            rws.onopen = () => {
                rws.send('id')
            }

        }
    }

    render() {
        return (
            <View style={styles.writeContainer}>
                <ScrollView>
                    <View>
                        <View style={styles.titleInputContainer}>
                            <View>
                                <Text>Post title</Text>
                            </View>
                            <View>
                                <TextInput placeholder="Enter at least 2 maximum 20" style={styles.titleInput} onChangeText= {(text) => this.titleHandleText(text)}/>
                            </View>
                            <View>
                                <Text>title checked : {this.state.postTitle}</Text>
                            </View>
                        </View>
                        <View style={styles.contentInputContainer}>
                            <View>
                                <Text>Post Content </Text>
                            </View>
                            <View>
                                <TextInput placeholder="Enter at least 2 maximum 40" style={styles.contentInput} onChangeText= {(text) => this.contentHandleText(text)}/>
                            </View>
                            <View>
                                <Text>content checked : {this.state.postContent}</Text>
                            </View>
                        </View>
                        <View style={styles.priceInputContainer}>
                            <View>
                                <Text>Post Price</Text>
                            </View>
                            <View>
                                <TextInput style={styles.priceInput} onChangeText= {(price) => this.priceHandleText(price)}/>
                            </View>
                            <View>
                                <Text>price checked : {this.state.postPrice}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.categoryContainer}>
                                <RadioForm 
                                    initial={0}
                                    animation={true}
                                >
                                        {
                                            category_props.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i}
                                                selectedButtonColor={'#ffffff'} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    onPress={() => this.setState({postCategory: category_props[i].label})}
                                                    buttonInnerColor={'#ffffff'}
                                                    buttonOuterColor={'#874c3c'}
                                                    buttonSize={15}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{marginLeft: 10}}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={() => this.setState({postCategory: category_props[i].label})}
                                                    labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                            ))
                                        }  
                                </RadioForm>
                            </View>
                            <View>
                                <Text>category checked: {this.state.postCategory}</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Button title="Save" onPress={() => this.clickSaveBtn()}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const {width, height} = Dimensions.get("screen");

const styles= StyleSheet.create({
    writeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleInputContainer: {
        marginHorizontal: 30,
    },
    titleInput: {
        borderColor: "black",
        borderWidth: 1,
        width: width / 1.3,
        padding: 10,
    },
    contentInputContainer: {
        marginHorizontal: 30,
    },
    contentInput: {
        borderColor: "black",
        borderWidth: 1,
        width: width / 1.3,
        height: height / 7,
        padding: 10,
    },
    priceInputContainer: {
        marginHorizontal: 30,
    },
    priceInput: {
        borderColor: "black",
        borderWidth: 1,
        width: width / 1.3,
        padding: 10,
    },
    categoryContainer: {
        flexDirection: "row",
        marginVertical: 20,
        marginHorizontal: 100,
    },
    categoryBtn: {
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: "rgba(81,135,200,1)",
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    }

})

export default WritePostScreen;
