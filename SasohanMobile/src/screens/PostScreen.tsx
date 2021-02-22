/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import postList from '../../postList.json';


type Props = { 
  navigation: any
}

type PostProps = {
  title: string;
  body: string;
  category_id: string;
  price: number;
}


type State = {
    data: any,
    itemToRender: number;
    setPostItems: PostProps;
}

class PostScreen extends React.Component<Props, State> {

    constructor(props: any){
        super(props);
        this.state = {
            data: postList,
            itemToRender: 10,
            setPostItems: {
              title: "", body: "", category_id: "", price: 0,
            }
        }
    }

    ClickMovetoWriteScreen = () => {
      this.props.navigation.navigate('WritePostScreen')
    }

    ClickMovetoSearchScreen = () => {
      this.props.navigation.navigate('SearchScreen')
    }

    ClickMovetoDetailPostScreen = (index: number) => {
        this.props.navigation.navigate('DetailPostScreen', {
          title: this.state.data[index].post.title,
          body: this.state.data[index].post.body,
          category_id: this.state.data[index].post.category_id,
          price: this.state.data[index].post.price,
        })
    }
      
    render() {
        const items = this.state.data.map((item: any, index: number) => {
            if (index+1 <= this.state.itemToRender){
              return (
                  <TouchableOpacity
                    onPress={() => this.ClickMovetoDetailPostScreen(index)}
                    key={index}
                  >
                    <View key={item.post.user_id} style={styles.item}>
                          <View style={styles.marginLeft}>
                            <Text style={styles.title}> {item.post.title}</Text>
                            <Text style={styles.body}> {item.post.body} </Text>
                          </View>   
                    </View>
                  </TouchableOpacity>
              )
            }
        })
        return (
            <View style={styles.contentContainer}>
                <View>
                    <View style = {{flexDirection: 'row'}}>
                        <Image 
                          source={require('../pics/Logo.jpg')}
                          style={styles.logo}
                        />
                        <TouchableOpacity
                          onPress={this.ClickMovetoSearchScreen}
                        >
                          <Image 
                            source={require('../pics/search.png')}
                            style={styles.search}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.ClickMovetoWriteScreen}
                        >
                          <Image
                            source={require('../pics/write.png')}
                            style={styles.write}
                          />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                  <ScrollView onMomentumScrollEnd={(e) => {
                    const scrollPosition = e.nativeEvent.contentOffset.y;
                    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
                    const contentHeight = e.nativeEvent.contentSize.height;
                    const isScrolledToBottom = scrollViewHeight + scrollPosition;

                    if (isScrolledToBottom >= (contentHeight-50) && this.state.itemToRender <= this.state.data.length){
                      this.setState({ itemToRender: this.state.itemToRender + 10})
                    }
                  }}>
                      <View>
                          {items}
                      </View>
                  </ScrollView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    position: 'relative',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
  },
  title: {
    marginVertical: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  body: {
    marginVertical: 30,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10
  },
  marginLeft: {
    marginLeft: 5,
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: '#111',
    margin: 2,
    borderRadius: 3,
  },
  header: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  postBtn: {
    marginLeft: 200,
  },
  logo: {
    height: 50,
  },
  search: {
    width: 50,
    height: 50,
  },
  write: {
    width: 50,
    height: 50,
  }
})

export default PostScreen;
