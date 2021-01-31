/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {View, Text, Alert, Platform, StyleSheet, Image, Button} from 'react-native';
import kakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';

// class LoginScreen extends Component {
  
  // const [loginLoading, setLoginLoading];
  
  //  kakaoLogin = () => {
  //   console.log('login for kakao');

  //   kakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]).then(result => {
  //     this.setToken(result.accessToken);
  //   })
  // }

  // render() {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Text>PostScreens</Text>
      
  //       <Button>
  //         onPress={(): void => {this.kakaoLogin()}}
  //         <Text style={{ color: '#3C1E1E', fontWeight: 'bold' }}>
  //           카카오 로그인
  //         </Text>
  //       </Button>
  //     </View>
  //   );
  // }
// }

// export default LoginScreen;

export default function LoginScreen() {
  const TOKEN_EMPTY = 'cannot fetched token';
  const PROFILE_EMPTY = {
    id: 'cannot fetched profile',
    email: 'cannot fetched profile',
    profile_image_url: '',
  };

  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [unlinkLoading, setUnlinkLoading] = useState<boolean>(false);

  const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  const kakaoLogin = () => {
    console.log('login for kakao', setLoginLoading(true));

    kakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]).then(result => {
      setToken(result.accessToken);
      console.log(`Login Finished:${JSON.stringify(result)}`,
      setLoginLoading(false),
      );
    })
    .catch(err => {
    if (err.code === 'E_CANCELLED_OPERATION') {
      console.log(`Login Cancelled:${err.message}`, setLoginLoading(false));
    } else {
      console.log(
        `Login Failed:${err.code} ${err.message}`,
        setLoginLoading(false),
      );
    }
  });}
  
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
        <Button title="LOGIN"
          onPress={kakaoLogin}>
          LOGIN
        </Button>
      </View>
    </View>
  );
}