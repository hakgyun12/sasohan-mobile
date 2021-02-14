import React, { Component } from 'react';
import { Text, View } from 'react-native';


class SearchScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>SearchScreen</Text>
      </View>
    );
  }
}

export default SearchScreen;