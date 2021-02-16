/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import Geolocation from 'react-native-geolocation-service';

class PostScreen extends Component {
  render() {
    return (
      <AskModal />
    );
  }
}

class AskModal extends Component {
  state = {
    modalVisible: false,
    agreeLocation: false
  };

  setAgreeLocation = (location: boolean) => {
    this.setState({ agreeLocation: location })
  }

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Button
          title="Show modal"
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Button>
        <Modal
          isVisible={modalVisible}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Do you agree with location-provided information services?</Text>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  title="Yes"
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Button>
                <Button
                  title="No"
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>No</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    minHeight: 50,
    minWidth: 50,
  },
  modalText: {
    fontSize: 20,
    alignItems: "center",
  },
  textStyle: {
    fontSize: 15,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 2
  }
});

export default PostScreen;
