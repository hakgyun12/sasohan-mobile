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
   * ����ڰ� �ۼ���, �ذ���, �ذ���� ���� �� 3������ ��쿡 �� ��ũ���� ����ؾߵȴ�.
   * ����ڰ� Ŭ���� Post���� key�� ������ �����س��� ��ũ���� �ѱ� ��
   * componentDidMount function���� key�� �ش��ϴ� url�� �ҷ��� �� �ֵ��� �����Ѵ�.
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
   * ScrollView�� �޸� FlatList�� ����ϴ� ����
   * ���� �����Ͱ� ȭ�鿡 ����� ���� Scroll�� ����������, �ѹ��� ��� �����͸�
   * ���������� �ʰ� ȭ�鿡 �������� �κ�(Ȥ�� ������ ����ŭ�� ������)�� �������Ѵٴ� ���̰� �ִ�.
   * 
   * Flatlist�� �⺻���� data�� renderItem�� �䱸�Ѵ�. 
   * @data : ������ �ۼ���, �ذ���, �ذ���� ���� �Խù��� ��Ÿ����.
   * @renderItem : FlatList�� ���Ǵ� data �ҽ��� �ϳ��� ������ ������ �� ������ ��Ҹ� ��ȯ�Ѵ�.
   * @KeyExtractor : ����ؼ� key �κ��� ���ٰ� ������ ���� ã�ƺ��Ҵ�.
   * ����� ��ҿ� Ű�� ���ٴ� ����� �Ͼ��. �̷��� ������ Ű�� Virtualized(FlatList�� ������ ��)�� �������� �� �ְ� �Ѵ�.
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
