/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, Platform, StyleSheet, Image} from 'react-native';
import kakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import Button from 'apsl-react-native-button'

export default function LoginScreen() {
  const TOKEN_EMPTY = 'cannot fetched token';

  const PROFILE_EMPTY = {
    id: 'cannot fetched profile',
    email: 'cannot fetched profile',
    profile_image_url: '',
  };

  interface Profile {
    id: string,
    email: string,
    profile_image_url: string
  }
  
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [unlinkLoading, setUnlinkLoading] = useState<boolean>(false);

  const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState<any | Profile>(PROFILE_EMPTY);

  const kakaoLogin = () => {
    console.log('login for kakao');
    setLoginLoading(true);

    kakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]).then(result => {
      setToken(result.accessToken);
      console.log(`Login Finished:${JSON.stringify(result)}`,
      setLoginLoading(false),
      );
    })
    .catch(err => {
    if (err.code === 'E_CANCELLED_OPERATION') {
      console.log(`Login Cancelled:${err.message}`);
      setLoginLoading(false);
    } else {
      console.log(`Login Failed:${err.code} ${err.message}`);
      setLoginLoading(false);
      }
    });
  };

  const kakaoLogout = () => {
    console.log('Logout');
    setLogoutLoading(true);

    kakaoLogins.logout().then(result => {
      setToken(TOKEN_EMPTY);
      setProfile(PROFILE_EMPTY);
      console.log(`Logout Finished:${result}`);
      setLogoutLoading(false);
    })
    .catch(err => {
      console.log(`Logout Failed:${err.code} ${err.message}`);
      setLogoutLoading(false);
    });
  };

  const getProfile = () => {
    console.log('Get Profile Start');
    setProfileLoading(true);

    kakaoLogins.getProfile()
      .then(result => {
        setProfile(result);
        console.log(`Get Profile Finished:${JSON.stringify(result)}`);
        setProfileLoading(false);
      })
      .catch(err => {
        console.log(`Get Profile Failed:${err.code} ${err.message}`);
        setProfileLoading(false);
      });
  };

  const unlinkKakao = () => {
    console.log('Unlink Start');
    setUnlinkLoading(true);

    kakaoLogins.unlink().then(result => {
        setToken(TOKEN_EMPTY);
        setProfile(PROFILE_EMPTY);
        console.log(`Unlink Finished:${result}`);
        setUnlinkLoading(false);
      })
      .catch(err => {
        console.log(`Unlink Failed:${err.code} ${err.message}`);
        setUnlinkLoading(false);
      });
  };

  const {id, email, profile_image_url: photo} = profile;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.profilePhoto} source={{uri: photo}} />
        <Text>{`id : ${id}`}</Text>
        <Text>{`email : ${email}`}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.token}>{token}</Text>
        <Button
          isLoading={loginLoading}
          onPress={kakaoLogin}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          LOGIN
        </Button>
        <Button
          isLoading={logoutLoading}
          onPress={kakaoLogout}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          LOGOUT
        </Button>
        <Button
          isLoading={profileLoading}
          onPress={getProfile}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          GETPROFILE
        </Button>
        <Button
          isLoading={unlinkLoading}
          onPress={unlinkKakao}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtKakaoLogin}>
          unlink
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: 'white',
  },
  profile: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'black',
  },
  content: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  token: {
    width: 200,
    fontSize: 12,
    padding: 5,
    borderRadius: 8,
    marginVertical: 20,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
  },
  btnKakaoLogin: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#F8E71C',
    borderRadius: 0,
    borderWidth: 0,
  },
  txtKakaoLogin: {
    fontSize: 16,
    color: '#3d3d3d',
  },
});