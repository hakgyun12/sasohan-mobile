/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, Image, Share} from 'react-native';
import kakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login'
import styles from './styles';

// @ts-ignore
import Button from 'apsl-react-native-button'
import { callbackify } from 'util';

interface Profile {
  id: string,
  profile_image_url: any
}

interface Token {
  accessToken: string,
  refreshToken: string
}

type loadingProps = {
  loginLoading: boolean;
  logoutLoading: boolean;
  profileLoading: boolean;
  unlinkLoading: boolean;
  signinLoading: boolean;
}

type idInfoProps = {
  token: Token;
  profile: Profile;
}

type State = {
  loading: loadingProps;
  idInfo: idInfoProps;
}

const TOKEN_EMPTY = {
  accessToken: 'cannot fetched access token',
  refreshToken: 'cannot fetched refresh token'
}

const PROFILE_EMPTY = {
  id: 'cannot fetched id',
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
        unlinkLoading: false,
        signinLoading: false
      },
      idInfo: {
        token: TOKEN_EMPTY,
        profile: PROFILE_EMPTY
      }
    }
  }

  kakaoLogin = () => {
    console.log('login for kakao');
    this.setState({loading: {...this.state.loading, loginLoading: true}});

    kakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]).then(result => {
      this.setState({idInfo: {...this.state.idInfo, token: {accessToken: result.accessToken, refreshToken: result.refreshToken}}})
      this.setState({loading: {...this.state.loading, loginLoading: false}}),
      console.log(`Login Finished:${JSON.stringify(result)}`,
      console.log(`Token:${JSON.stringify(this.state.idInfo.token)}`),
      );
    })
    .catch(err => {
    if (err.code === 'E_CANCELLED_OPERATION') {
      this.setState({loading: {...this.state.loading, loginLoading: false}})
      console.log(`Login Cancelled:${err.message}`);
    } else {
      this.setState({loading: {...this.state.loading, loginLoading: false}})
      console.log(`Login Failed:${err.code} ${err.message}`);
      }
    });
  };

  kakaoLogout = () => {
    console.log('Logout');
    this.setState({loading: {...this.state.loading, logoutLoading: true}});

    kakaoLogins.logout().then(result => {
      this.setState({idInfo: {...this.state.idInfo, token: TOKEN_EMPTY}})
      this.setState({idInfo: {...this.state.idInfo, profile: PROFILE_EMPTY}})
      console.log(`Logout Finished:${result}`);
      this.setState({loading: {...this.state.loading, logoutLoading: false}})
    })
    .catch(err => {
      this.setState({loading: {...this.state.loading, logoutLoading: false}})
      console.log(`Logout Failed:${err.code} ${err.message}`);
    });
  };

  getProfile = () => {
    console.log('Get Profile Start');
    this.setState({loading: {...this.state.loading, profileLoading: true}})

    kakaoLogins.getProfile()
      .then(result => {
        this.setState({idInfo: {...this.state.idInfo, profile: {id: result.id, profile_image_url: result.profile_image_url}}})
        this.setState({loading: {...this.state.loading, profileLoading: false}})
        console.log(`Get Profile Finished:${JSON.stringify(result)}`);
      })
      .catch(err => {
        this.setState({loading: {...this.state.loading, profileLoading: false}})
        console.log(`Get Profile Failed:${err.code} ${err.message}`);
      });
  };

  unlinkKakao = () => {
    console.log('Unlink Start');
    this.setState({loading: {...this.state.loading, unlinkLoading: true}})

    kakaoLogins.unlink().then(result => {
      this.setState({idInfo: {...this.state.idInfo, token: TOKEN_EMPTY}})
      this.setState({idInfo: {...this.state.idInfo, profile: PROFILE_EMPTY}})
      console.log(`Unlink Finished:${result}`);
      this.setState({loading: {...this.state.loading, unlinkLoading: false}})
      })
      .catch(err => {
        this.setState({loading: {...this.state.loading, unlinkLoading: false}})
        console.log(`Unlink Failed:${err.code} ${err.message}`);
      });
  };

  kakaoSignin = () => {
    console.log('kakao sign in start');
      this.kakaoLogin();
      this.getProfile();
      this.props.navigation.navigate('Search', {user_ide: this.state.idInfo.profile.id});
  }

  render() {
    return(
      <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.profilePhoto} source={{uri: this.state.idInfo.profile.profile_image_url !== "" ? this.state.idInfo.profile.profile_image_url : undefined}} />
        <Text>{`id : ${this.state.idInfo.profile.id}_kakao`}</Text>
        <Text></Text>
      </View>
      <View style={styles.content}>
        <Button
          isLoading={this.state.loading.loginLoading}
          onPress={() => {
            this.kakaoSignin();
            setTimeout(() => {
              this.kakaoSignin();
            } , 500)
            }
          }
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