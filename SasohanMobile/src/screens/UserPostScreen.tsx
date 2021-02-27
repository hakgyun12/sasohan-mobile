/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, Image, ActivityIndicator, TouchableOpacity, Modal} from 'react-native';

type Props = {
  navigation: any
  route: any
}

type State = {
  datasource: Array<string>,
  isLoading: boolean,
  isWritten: boolean,
  isSolved: boolean,
  isNotSolved: boolean,
  isShowingModal: boolean,
}

class UserPostScreen extends Component<Props, State> {

  constructor(props: any){
    super(props);
    this.state= {
      datasource: [],
      isLoading: true,
      isWritten: false,
      isSolved: false,
      isNotSolved: false,
      isShowingModal: false,
    }
  }

  /**
   * 사용자가 작성한, 해결한, 해결되지 못한 이 3가지의 경우에 한 스크린을 사용해야된다.
   * 사용자가 클릭한 Post마다 key를 별도로 지정해놓고 스크린을 넘길 때
   * componentDidMount function에서 key에 해당하는 url을 불러올 수 있도록 지정한다.
   */
  componentDidMount = () => {
    const key = this.props.route.params.key
    if(key === 'isWritten'){
      //const url = 'http://localhost:3000/posts/written/testid1'
      this.setState({
        isWritten: true
      })
    }else if(key === 'isSolved'){
      //const url = 'http://localhost:3000/posts/resolved/:user_id'
      this.setState({
        isSolved: true
      })
     }else if(key === 'isNotSolved'){
      //const url = 'http://localhost:3000/posts/unresolved'
      this.setState({
        isNotSolved: true
      })
    }
    const url = 'http://www.json-generator.com/api/json/get/ccLAsEcOSq?intend=1%27'

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        datasource: responseJson.book_array,
        isLoading: false
      });
    })
    .catch((error) => {
      console.log(error)
    })
  }

  ClicktoDetailScreen = ({item}: {item: any}) => {
    this.props.navigation.navigate('DetailPostScreen', {
      title: item.book_title,
      body: item.author,
    })
  }

  renderItem = ({ item }: { item: any}) => {
    return(
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row'}}
        onPress={() => this.ClicktoDetailScreen({item})}
      >
        <Image style={{ width: 100, height: 100, margin: 5}}
          source={{ uri: item.image }}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: 'green', marginBottom: 15}}>
            {item.book_title}
          </Text>
          <Text style={{ fontSize: 16, color: 'red'}}>
            {item.author}
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            {this.state.isWritten &&
              <View style={{flexDirection: 'row',}}>
                <TouchableOpacity style={{marginRight: 5}}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5}}>
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5}}
                  onPress={() => this.setState({
                    isShowingModal: true
                  })}
                >
                  <Text>Review</Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.isSolved &&
              <View>
                <TouchableOpacity style={{marginRight: 5}}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            }
            {this.state.isNotSolved &&
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{marginRight: 5}}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 5}}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
    </TouchableOpacity>
    )
  }

  renderSeparator = () => {
    return (
      <View style ={{ height: 1, width: '100%', backgroundColor: 'black'}}>

      </View>
    )
  }

  /**
   * ScrollView와 달리 FlatList를 사용하는 이유
   * 둘은 데이터가 화면에 벗어났을 때도 Scroll을 생성하지만, 한번에 모든 데이터를
   * 렌더링하지 않고 화면에 보여지는 부분(혹은 설정한 수만큼의 데이터)만 랜더링한다는 차이가 있다.
   * 
   * Flatlist는 기본적인 data와 renderItem를 요구한다. 
   * @data : 유저가 작성한, 해결한, 해결되지 못한 게시물을 나타낸다.
   * @renderItem : FlatList에 사용되는 data 소스를 하나씩 가져와 렌더링 할 형식의 요소를 반환한다.
   * @KeyExtractor : 계속해서 key 부분이 없다고 오류가 나서 찾아보았다.
   * 목록의 요소에 키가 없다는 경고에서 일어난다. 이러한 고유의 키는 Virtualized(FlatList가 구축한 것)을 추적해줄 수 있게 한다.
   */
  render() {
    return (
      this.state.isLoading
      ?
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating/>
      </View>
      :
      <View style={styles.container}>
        <View>
          <FlatList
            data={this.state.datasource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <View style={{backgroundColor:'#000000aa'}}>
          <Modal
              animationType="slide"
              visible={this.state.isShowingModal}
              transparent={true}
              onRequestClose={() => console.warn("close")}
          >
              <View style={{ height: "30", width: "70", backgroundColor : "white"}}>
                  <Text> Hello </Text> 
              </View>
          </Modal>
        </View>
      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex : 1,
    marginBottom: 50,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  }
})
export default UserPostScreen;
