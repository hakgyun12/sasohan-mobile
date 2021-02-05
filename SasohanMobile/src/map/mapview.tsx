import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Circle,
  Callout,
} from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Platform,
  View,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
import { InitialState } from '@react-navigation/native';

interface initialPositionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface CoordProps {
  name: string;
  latitude: number;
  longitude: number;
}

interface State {
  initialPosition: initialPositionProps;
  coordinates: CoordProps[];
}

class Map extends Component<State> {
  ref = React.createRef<any>();

  state = {
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    coordinates: [
      { name: 'POST 1', latitude: 37.8025259, longitude: -122.4351431 },
      { name: 'POST 2', latitude: 37.7896386, longitude: -122.421646 },
      { name: 'POST 3', latitude: 37.7665248, longitude: -122.4161628 },
      { name: 'POST 4', latitude: 37.7734153, longitude: -122.4577787 },
      { name: 'POST 5', latitude: 37.7948605, longitude: -122.4596065 },
    ],
  };

  // showPostContent = () => {
  //   Alert.alert(
  //     'title : show the PostTitle',
  //     'content : show the PostdetailContent',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //       },
  //     ],
  //   );
  // };

  componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('ANDROID: ' + response);

      if (response === PermissionsAndroid.RESULTS.GRANTED) {
        this.locationCurrentPosition();
      }
    } else {
      // var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      // console.log('iPhone: ' + response);
      // if (response === PERMISSIONS.IOS.RESULTS.GRANTED) {
      //     this.locationCurrentPosition();
      // }
    }
  };

  locationCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(JSON.stringify(position));

        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        this.setState({
          initialPosition: {
            ...this.state.initialPosition,
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        });

        //console.log(this.state.initialPosition.longitude);
        //console.log(this.state.initialPosition.latitude);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  };

  renderItem = ({ item, index }: { item: CoordProps; index: number }) => {
    return (
      <View
        style={styles.cardContainer}>
        <Text style={styles.titleStyle}>{item.name}</Text>
        <Text style={styles.postStyle}>{item.latitude}, {item.longitude}</Text>
      </View>
    )
  }

  // onCarouselItemChange = ({ index }: { index: number }) => {
  //   let location = this.state.coordinates[index];

  //   this.ref.current.animateToRegion({
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   })
  // }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={this.ref}
          style={styles.map}
          region={this.state.initialPosition}
          zoomEnabled={true}
          showsScale={true}
          showsUserLocation={true}
          initialRegion={this.state.initialPosition}>
          <Marker
            coordinate={{
              latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
            }}
            title="temporary marker"
            description="this is a marker example"
            pinColor={'orange'}>
            {/* <Callout onPress={this.showPostContent} /> */}
          </Marker>

          {
            this.state.coordinates.map((marker) => (
              <Marker
                key={marker.name}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}>
                {/* <Callout onPress={this.showPostContent} /> */}
              </Marker>
            ))}
        </MapView>

        <Carousel
          ref={this.ref}
          data={this.state.coordinates}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
        />
      </View>
    );
  }
}

/**
 * Height가 700으로 표현되어 있지만
 * 세로가 긴 기종이 있으므로 Relative(절대적으로) 바꿔야 함.
 */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    minHeight: 700,
    minWidth: 50,
  },
  carousel: {
    position: 'absolute',
    bottom: -600,
    marginTop: 30,
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 170,
    width: 300,
    padding: 24,
    borderRadius: 24,
  },
  titleStyle: {
    fontSize: 30,
    color: 'white',
    marginBottom: 5,
  },
  postStyle: {
    fontSize: 15,
    color: 'white',
  }
});
export default Map;
