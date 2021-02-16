import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Platform,
  View,
  Image,
  Button,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CarouselModel from '../model/CarouselModel';

type currentPositionProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type currentBoundingBox = {
  NElatitude: number;
  NElongitude: number;
  SWlatitude: number;
  SWlongitude: number;
}

type CoordProps = {
  postTitle: string;
  postContent: string;
  categoryId: string;
  price: number;
  latitude: number;
  longitude: number;
}

type State = {
  isShowingCarousel: boolean;
  currentPosition: currentPositionProps;
  coordinates: CoordProps[];
  currentBoundingBox: currentBoundingBox;
  setCarouselItem: CoordProps;
}

class Map extends React.Component<any, State> {
  mapRef = React.createRef<any>();

  constructor(props: any) {
    super(props);

    this.state = {
      isShowingCarousel: false,
      currentPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      coordinates: [
        { postTitle: 'POST 1', postContent: 'CONTENT 1', categoryId: "가전/가구", price: 3000, latitude: 36.1294833, longitude: 128.3445733 },
        { postTitle: 'POST 2', postContent: 'CONTENT 2', categoryId: "스포츠", price: 4000, latitude: 36.1094833, longitude: 128.3345733 },
        { postTitle: 'POST 3', postContent: 'CONTENT 3', categoryId: "카테고리", price: 5000, latitude: 36.1394833, longitude: 128.3545733 },
        { postTitle: 'POST 4', postContent: 'CONTENT 4', categoryId: "카테고리", price: 6000, latitude: 36.1494833, longitude: 128.3245733 },
        { postTitle: 'POST 5', postContent: 'CONTENT 5', categoryId: "카테고리", price: 7000, latitude: 36.1594833, longitude: 128.3645733 },
      ],
      setCarouselItem: {
        postTitle: '', postContent: '', categoryId: "", price: 0, latitude: 0, longitude: 0,
      },
      currentBoundingBox: {
        NElatitude: 0, NElongitude: 0, SWlatitude: 0, SWlongitude: 0,
      }
    }
  }
  /**
   * Obtain permission to check the user's device and obtain the location accordingly.
   */
  requestLocationPermission = async () => {

    //if user device is Android
    if (Platform.OS === 'android') {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (response === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {

            this.mapRef.current.animateToRegion({
              ...this.state.currentPosition,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })

            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            this.setState({
              currentPosition: {
              ...this.state.currentPosition,
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            });

            this.mapRef.current.animateToRegion(this.state.currentPosition);
          },
          (error) => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
        );
      } else {
        /**
         * this is user device for IOS platform
         */
        // var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        // console.log('iPhone: ' + response);
        // if (response === PERMISSIONS.IOS.RESULTS.GRANTED) {
        //     this.locationCurrentPosition();
        // }
      }
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
  }


  onRegionChangeComplete = (region: currentPositionProps) => {
    this.setState({ currentPosition: region })
    this.setState({
      currentBoundingBox: {
        ...this.state.currentBoundingBox,
        NElatitude: region.latitude + region.latitudeDelta / 2, // northLat - max lat
        NElongitude: region.longitude + region.longitudeDelta / 2, // eastLng - max lng
        SWlatitude: region.latitude - region.latitudeDelta / 2, // southLat - min lat
        SWlongitude: region.longitude - region.longitudeDelta / 2, // westLng - min lng
      }
    })
  }

  /**
   * Every time you turn the screen of a post, it shows the contents of the post corresponding to a marker.
   */
  hideCarousel = () => {
    this.setState({ isShowingCarousel: false })
  }

  ClickMovetoDetailScreen = () => {
    this.props.navigation.navigate('DetailPostScreen', {
      postTitle: this.state.setCarouselItem.postTitle,
      postContent: this.state.setCarouselItem.postContent,
      categoryId: this.state.setCarouselItem.categoryId,
      price: this.state.setCarouselItem.price,
    })}

  /**
   * When you click a marker, go to the marker screen in the middle of the screen and show the corresponding carousel UI.
   */
  onMarkerPressed = (location: CoordProps) => {
    const { isShowingCarousel } = this.state;

    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0422,
    }

    this.mapRef.current.animateToRegion(region);

    this.setState({
      setCarouselItem: {
        ...this.state.setCarouselItem,
        postTitle: location.postTitle,
        postContent: location.postContent,
        price: location.price,
        categoryId: location.categoryId,
        latitude: location.latitude,
        longitude: location.longitude,
      }
    })
    if (!isShowingCarousel) {
      this.setState({ isShowingCarousel: true });
    }
  }

  render() {
    const currentPosition = this.state.currentPosition
    return (
      <View>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={this.mapRef}
            style={styles.map}
            region={currentPosition}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}

            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {
              this.state.coordinates.map((marker) => (
                <Marker
                  key={marker.postTitle}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  onPress={() => this.onMarkerPressed(marker)}>
                </Marker>
              ))}
          </MapView>
        </View>
        {this.state.isShowingCarousel &&
        <View style={{position: 'absolute', bottom: 10}}>
          <CarouselModel
            item={this.state.setCarouselItem}
            hideCarousel={this.hideCarousel}
            ClicktoMoveDetailScreen={this.ClickMovetoDetailScreen}
          />
        </View>
        }
      </View>
    );
  }
}

/**
 * Height is expressed as a number, but must be expressed absolutely later.
 */
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 6,
    width,
    height,
  },
  header: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  carousel: {
    position: 'absolute',
    marginBottom: 30,
    marginTop: 470,
  },
  cardContainer: {
    backgroundColor: 'white',
    height: 170,
    width: 310,
    padding: 24,
    borderRadius: 24,
  },
  titleStyle: {
    fontSize: 30,
    color: 'black',
    marginBottom: 5,
  },
  contentStyle: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
  },
  postStyle: {
    fontSize: 15,
    color: 'black',
  },
  buttonStyle: {
    height: 50,
    width: 30,
  },
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
});

export default Map;
