/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
} from "react-native";

import SearchInput, { createFilter } from 'react-native-search-filter';
import postList from '../../postList.json';


interface Props {
  navigation: any,
}

interface State {
  data: any,
  searchTerm: string
}

const KEYS_TO_FILTERS = ['post.title', 'post.body']
 
class SearchScreen extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
          searchTerm: '',
          data: postList,
      }
    }

    searchUpdated(text: string) {
      this.setState({ searchTerm: text })
    }

    ClickMovetoDetailPostScreen = (data: any) => {
      this.props.navigation.navigate('DetailPostScreen', {
        title: data.post.title,
        body: data.post.body,
        category_id: data.post.category_id,
        price: data.post.price,
      })
    }

    /* 
    * 해당 게시물 클릭했을 때 넘어가는 거 index가 아닌 게시물 data로 넘겨서 받아야 함.
    */
    render() {
      const filteredPosts = postList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      return (
        <View style={styles.container}>
          <SearchInput
            onChangeText={(text) => { this.searchUpdated(text) }}
            style={styles.searchInput}
            placeholder="Post search"
          />
          <ScrollView>
            {filteredPosts.map((data) => {
              return (
                <TouchableOpacity onPress={() => this.ClickMovetoDetailPostScreen(data)} key={data.post.user_id} style={styles.emailItem}>
                  <View>
                    <Text>{data.post.title}</Text>
                    <Text style={styles.emailSubject}>{data.post.body}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});

export default SearchScreen;