import MapView from 'react-native-maps';

import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Map from './map/mapview';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * 컴포넌트를 1개씩 만든다는 건
 * 1. 유지보수가 용이하고 진입장벽이 낮아짐.
 * 2. 재사용 가능하게 함.
 */
class Headerbar extends Component {
  render() {
    return (
      <View style={styles.headerBar}>
        <Text style={styles.headerBarText}>
          sasohan Logo
        </Text>
      </View>
    );
  }
}

// class AgreeLocation extends Component {
//   state = {
//     agreeUserLocation: false,
//   }

//   userAgree = () => {
//     this.setState({
//       agreeUserLocation: true,
//     })
//   }

//   userDegree = () => {
//     this.setState({
//       agreeUserLocation: false,
//     })
//   }

//   render() {
//     return (
//       <View style={styles.agree}>
//         <View style={{ height: 150 }}>
//           <Text>위치 제공 서비스에 동의하십니까?</Text>
//         </View>
//         <View style={{ height: 50 }}>
//           <View style={{ flexDirection: 'row' }}>
//             <Button
//               onPress={this.userAgree}
//               title="Yes"
//               color="green"
//             />
//             <Button
//               onPress={this.userDegree}
//               title="No"
//               color="red"
//             />
//           </View>
//         </View>
//       </View>
//     )
//   }
// }

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View>
          <Headerbar />
        </View>
        <View>
          <Map />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBar: {
    height: 60,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarText: {
    fontSize: 20,
    color: 'black',
  },
  agree: {

  }
})
export default HomeScreen;