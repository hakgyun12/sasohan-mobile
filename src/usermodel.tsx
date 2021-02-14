import React from 'react';
import {Alert, View, Text, Image} from 'react-native';
import styles from './styles';

type User_Info = {
    user_id: string;
    nickname: string;
    nicknameCheck: string;
    gender: string;
    age: number;
}

class User extends React.Component<User_Info, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            User_Info: {
                user_id: "",
                nickname: "",
                nicknameCheck: "",
                gender: "",
                age: 0
            }
        };
    }
    
    handleNickname = (e: any) => {
        e.preventDefault();
        this.setState({
            nickname: e.target.value
        });
    };

    checkNickName = (e: any) => {
        e.preventDefault();

        const chkNickname = function(str: string) {
            var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
            return regNm.test(str) ? true : false;
        };

        const inputNickname = {
            nickname: this.state.nickname
        };

        const nickname_info = {
            method: "POST",
            body: JSON.stringify(inputNickname),
            headers: {
                "Content-Type": "application/json"
            }
        };
        if(chkNickname(this.state.nickname) === false) {
            Alert.alert("한글,영문 대소문자 2~15자리만 사용 가능합니다");
        }
        else {
            fetch("http://localhost:9089/user/nick", nickname_info).then(res=>res.json()).then(json=> {
                if(json === true) {
                    Alert.alert("사용 가능한 닉네임입니다.");
                    this.setState({
                        nicknameCheck: this.state.nickname
                    });
                } else {
                    Alert.alert("이미 존재하는 닉네임입니다.");
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    handleNickname = {this.handleNickname}
                    checkname = {this.checkNickName}
                    value = {this.state.nickname}
                </div>
            </div>
        )
    }
}