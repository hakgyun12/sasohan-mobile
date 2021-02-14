import React from 'react';
import {Alert, Text, View, TextInput} from 'react-native';
// @ts-ignore
import Button from 'apsl-react-native-button'
import styles from './styles';
import profile from './user';

type User_Info = {
    user_id: string;
    nickname: string;
    nicknameCheck: string;
    gender: string;
    age: number;
}

class User extends React.Component<User_Info, any> {
    state = {
      nickname: "",
      tmpNickname: ""
    }

    inputNickname = () => {
      this.setState({nickname: this.state.tmpNickname});
    }

    checkNickName = (e: any) => {
        const chkNickname = function(str: string) {
          var regNm = /^[0-9a-zA-Z가-힣]{4,15}$/; 
          return regNm.test(str) ? true : false;
        };
        
        if(chkNickname(this.state.tmpNickname) === false) {
            Alert.alert("한글,영문 대소문자 4~15자리만 사용 가능합니다");
        }
        else {
          this.setState({
              nickname: this.state.tmpNickname
          });
        }
    }

  
    render() {
        return (
          <View style={styles.container}>
          <Text style={styles.headerText}>TextInput 가지고 놀아보자</Text>
          <View style={styles.bodyContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {this.setState({tmpNickname: text})}}
              placeholder="아무거나 입력해주세요."
            />
            <Button 
            style={{backgroundColor: 'blue'}} 
            textstyle={{fontSize: 18}}
            onPress = {this.checkNickName}>
            중복확인
            </Button> 
            <Text style = {styles.showText}>{this.state.nickname}</Text>
          </View>
        </View>
        );
    }
}

export default User;