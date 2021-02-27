/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Text, Modal, View, TouchableOpacity} from 'react-native';

type Props = {
    show: boolean
}

type State = {
    isModalVisible: boolean
}

class ReviewModal extends Component<Props, State> {

    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.props.show}
                transparent={true}
                onRequestClose={() => { }}
            >
                <View style={{ height: "30", width: "70", backgroundColor : "white"}}>
                    <Text> Hello </Text> 
                </View>
            </Modal>
        );
    }
}


export default ReviewModal;