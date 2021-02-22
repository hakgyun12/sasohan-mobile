import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import React, {Component} from 'react';
import {
  StyleSheet,
  Alert,
  Platform,
  View,
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
  title: string;
  body: string;
  category_id: string;
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

class Map extends Component<any, State> {
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
        { title: 'POST 1', body: 'CONTENT 1', category_id: "카테고리", price: 3000, latitude: 36.1294833, longitude: 128.3445733 },
        { title: 'POST 2', body: 'CONTENT 2', category_id: "카테고리", price: 4000, latitude: 36.1094833, longitude: 128.3345733 },
        { title: 'POST 3', body: 'CONTENT 3', category_id: "카테고리", price: 5000, latitude: 36.1394833, longitude: 128.3545733 },
        { title: 'POST 4', body: 'CONTENT 4', category_id: "카테고리", price: 6000, latitude: 36.1494833, longitude: 128.3245733 },
        { title: 'POST 5', body: 'CONTENT 5', category_id: "카테고리", price: 7000, latitude: 36.1594833, longitude: 128.3645733 },
      ],
      setCarouselItem: {
        title: '', body: '', category_id: "", price: 0, latitude: 0, longitude: 0,
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
    }
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
      title: this.state.setCarouselItem.title,
      body: this.state.setCarouselItem.body,
      category_id: this.state.setCarouselItem.category_id,
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
        title: location.title,
        body: location.body,
        price: location.price,
        category_id: location.category_id,
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
                  key={marker.title}
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
