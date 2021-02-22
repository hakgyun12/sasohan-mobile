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

type item = {
  title: string;
  body: string;
  category_id: string;
  price: number;
}

interface Props {
  item: item
  ClicktoMoveDetailScreen: () => void
}

interface State {
  data: any,
  searchTerm: string
}

const KEYS_TO_FILTERS = ['postList.title', 'postList.body']
 
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

    render() {
      const filteredPosts = postList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      return (
        <View style={styles.container}>
          <SearchInput
            onChangeText={(text) => { this.searchUpdated(text) }}
            style={styles.searchInput}
            placeholder="Type a message to search"
          />
          <ScrollView>
            {filteredPosts.map(email => {
              return (
                <TouchableOpacity onPress={() => Alert.alert(this.state.data.title)} key={this.state.data.user_id} style={styles.emailItem}>
                  <View>
                    <Text>{this.state.data.title}</Text>
                    <Text style={styles.emailSubject}>{this.state.data.body}</Text>
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