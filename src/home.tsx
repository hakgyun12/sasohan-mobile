/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import kakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

// @ts-ignore
import Button from 'apsl-react-native-button'

interface Profile {
  id: string,
  profile_image_url: any
}

type loadingProps = {
  loginLoading: boolean;
  logoutLoading: boolean;
  profileLoading: boolean;
  unlinkLoading: boolean;
}

type userInfoProps = {
  token: string;
  profile: Profile;
}

type State = {
  loading: loadingProps;
  userInfo: userInfoProps;
}

const TOKEN_EMPTY = 'cannot fetched token';

const PROFILE_EMPTY = {
  id: 'cannot fetched profile',
  profile_image_url: '',
};

export default class LoginScreen extends React.Component<any, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: {
        loginLoading: false,
        logoutLoading: false,
        profileLoading: false,
        unlinkLoading: false
      },
      userInfo: {
        token: TOKEN_EMPTY,
        profile: PROFILE_EMPTY
      }
    }
  }

  kakaoLogin = () => {
    console.log('login for kakao');
    this.state.loading.loginLoading = true;

    kakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]).then(result => {
      this.state.userInfo.token = result.accessToken;
      console.log(`Login Finished:${JSON.stringify(result)}`,
      this.state.loading.loginLoading = false,
      console.log(`Token:${JSON.stringify(this.state.userInfo.token)}`),
      );
    })
    .catch(err => {
    if (err.code === 'E_CANCELLED_OPERATION') {
      console.log(`Login Cancelled:${err.message}`);
      this.state.loading.loginLoading = false;
    } else {
      console.log(`Login Failed:${err.code} ${err.message}`);
      this.state.loading.loginLoading = false;
      }
    });
  };

  kakaoLogout = () => {
    console.log('Logout');
    this.state.loading.logoutLoading = true;

    kakaoLogins.logout().then(result => {
      this.state.userInfo.token = TOKEN_EMPTY;
      this.state.userInfo.profile = PROFILE_EMPTY;
      console.log(`Logout Finished:${result}`);
      this.state.loading.logoutLoading = false;
    })
    .catch(err => {
      console.log(`Logout Failed:${err.code} ${err.message}`);
      this.state.loading.logoutLoading = false;
    });
  };

  getProfile = () => {
    console.log('Get Profile Start');
    this.state.loading.profileLoading = true;

    kakaoLogins.getProfile()
      .then(result => {
        this.state.userInfo.profile.id = result.id;
        this.state.userInfo.profile.profile_image_url = result.profile_image_url;
        console.log(`Get Profile Finished:${JSON.stringify(result)}`);
        this.state.loading.profileLoading = false;
        console.log(this.state.userInfo.profile.id);
        console.log(this.state.userInfo.profile.profile_image_url);
      })
      .catch(err => {
        console.log(`Get Profile Failed:${err.code} ${err.message}`);
        this.state.loading.profileLoading = false;
      });
  };

  unlinkKakao = () => {
    console.log('Unlink Start');
    this.state.loading.unlinkLoading = true;

    kakaoLogins.unlink().then(result => {
        this.state.userInfo.token = TOKEN_EMPTY;
        this.state.userInfo.profile = PROFILE_EMPTY;
        console.log(`Unlink Finished:${result}`);
        this.state.loading.unlinkLoading = false;
      })
      .catch(err => {
        console.log(`Unlink Failed:${err.code} ${err.message}`);
        this.state.loading.unlinkLoading = false;
      });
  };


  render() {
    return(
      <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.profilePhoto} source={{uri: this.state.userInfo.profile.profile_image_url !== "" ? this.state.userInfo.profile.profile_image_url : undefined}} />
        <Text>{`id : ${this.state.userInfo.profile.id}_kakao`}</Text>
        <Text></Text>
      </View>
      <View style={styles.content}>
        <Button
          isLoading={this.state.loading.loginLoading}
          onPress={this.kakaoLogin}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          LOGIN
        </Button>
        <Button
          isLoading={this.state.loading.logoutLoading}
          onPress={this.kakaoLogout}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          LOGOUT
        </Button>
        <Button
          isLoading={this.state.loading.profileLoading}
          onPress={this.getProfile}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          GETPROFILE
        </Button>
        <Button
          isLoading={this.state.loading.unlinkLoading}
          onPress={this.unlinkKakao}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          unlink
        </Button>
      </View>
    </View>
    )
  };
}