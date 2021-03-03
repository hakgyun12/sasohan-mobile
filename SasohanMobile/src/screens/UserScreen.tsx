/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Title, Caption, Text, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  navigation: any;
}

type PostsTitle = {
  title: string;
  key: string;
}

type State = {
  userData: Array<string>;
  postData: PostsTitle[];
}

class UserScreen extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state= {
      userData: [],
      postData: [
        {title: 'View my posts', key: 'isWritten'},
        {title: 'View posts that I have solved', key: 'isSolved'},
        {title: 'View posts that I have not solved', key: 'isNotSolved'},
      ]
    }
  }

  componentDidMount = () => {
    // const url = 'http://localhost:3000/user/testid'

    // fetch(url)
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //     userData: responseJson.user
    //   });
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  }

  ClicktoUserPostScreen = ({item}: {item: any}) => {
    this.props.navigation.navigate('UserPostScreen', {
      key: item.key
    })
  }

  Logout = ({item}: {item: any}) => {

  }

  /**
   * User NickName과 id는 Login을 통해서 받아와야 함.
   */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              //Login을 통해서 가져온 Profile Image를 가져오면 Avatar.Image source에 적용시키면 됨.
              source={{
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>User NickName</Title>
              <Caption style={styles.caption}>User Id</Caption>
            </View>
          </View>
        </View>
        <View style = {styles.userInfoSection}>
          <View style= {styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>South Korea, Seoul</Text>
          </View>
          <View style= {styles.row}>
            <Icon name="phone" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>+82-010-9999-9999</Text>
          </View>
          <View style= {styles.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>asd1234@gmail.com</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>200</Title>
            <Caption>point</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>20</Title>
            <Caption>Solved</Caption>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <View>
          {
            this.state.postData.map((item, index) => (
              <TouchableOpacity
                onPress={() => this.ClicktoUserPostScreen({item})}
                key={index}
                style={styles.menuItem}         
              >
                <Icon name="post" color="#777777" size={25} />
                <Text style={styles.menuItemText} key={item.key}>{item.title}</Text>
              </TouchableOpacity>
            ))
          }
          </View>
          <View>
            <TouchableOpacity
              onPress={(item) => this.Logout({item})}
              style={styles.menuItem}       
            >
              <Icon name="post" color="#777777" size={25} />
              <Text style={styles.menuItemText} key="setting">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  posts: { 

  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  }
})
export default UserScreen;
