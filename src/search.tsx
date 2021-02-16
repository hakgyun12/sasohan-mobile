import React from 'react';
import {Alert, Text, View, TextInput} from 'react-native';
// @ts-ignore
import Button from 'apsl-react-native-button'
import styles from './styles';
import { timingSafeEqual } from 'crypto';

type Userinfo = {
  user_id: string,
  nickname: string,
  tmpNickname: string,
  nicknameCheck: string,
  gender: string,
  age: number
}

type nicknameListProps = {
}

interface State {
  user: Userinfo;
  nicknameList: nicknameListProps[];
};

interface Props {
  navigation: any
  route: any
};

export default class User extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: {
        user_id: "",
        nickname: 'None_nickname',
        tmpNickname: '',
        nicknameCheck: '',
        gender: 'None',
        age: 0
      },
      nicknameList: [
        '', '1233', '1234'
      ]
    }
  }

  inputNickname = () => {
    this.setState({user: {...this.state.user, nickname: this.state.user.tmpNickname}})
  }

  checkNickName =  () => {
      const chkNickname = function(str: string) {
        var regNm = /^[0-9a-zA-Z가-힣]{2,8}$/; 
        return regNm.test(str) ? true : false;
      };
      
      if(chkNickname(this.state.user.tmpNickname) === false) {
          Alert.alert("한글, 영문, 숫자 대소문자 2~8자리만 사용 가능합니다");
      }
      else {
        if(this.state.nicknameList.indexOf(this.state.user.tmpNickname) > 0) {
          Alert.alert("이미 존재하는 닉네임입니다.");
        }
        else {
          this.setState({user: {...this.state.user, nickname: this.state.user.tmpNickname}})
          this.state.nicknameList.push(this.state.user.tmpNickname);
          console.log(this.state.nicknameList);
        }
      }
  }



  

  checkNicknameList = (element: string) => {
    if(element === this.state.user.tmpNickname) {
      return true;
    }
  }

  render() {
    const user_ide = this.props.route.params.user_ide;
    return (
      <View style={styles.container}>
      <Text style={styles.headerText}>닉네임 설정</Text>
      <Text style={styles.headerText}>id: {user_ide}</Text>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {this.setState({user: {...this.state.user, tmpNickname: text}})}}
          placeholder="아무거나 입력해주세요."
        />
        <Button 
        style={{backgroundColor: 'blue'}} 
        textstyle={{fontSize: 18}}
        onPress = {this.checkNickName}>
        중복확인
        </Button> 
        <Text style = {styles.showText}>{this.state.user.nickname}</Text>
      </View>
    </View>
    );
  }
}