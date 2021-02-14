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
import Carousel, { CarouselProperties } from 'react-native-snap-carousel'
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

type initialPositionProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
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
  initialPosition: initialPositionProps;
  coordinates: CoordProps[];
}

class Map extends React.Component<any, State> {
  mapRef = React.createRef<any>();
  carousel = React.createRef<any>();
  _isMounted = false;

  constructor(props: any) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 37.715133,
        longitude: 126.734086,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      coordinates: [
        { postTitle: 'POST 1', postContent: 'CONTENT 1', categoryId: "가전/가구", price: 3000, latitude: 36.1294833, longitude: 128.3445733 },
        { postTitle: 'POST 2', postContent: 'CONTENT 2', categoryId: "스포츠", price: 4000, latitude: 36.1094833, longitude: 128.3345733 },
        { postTitle: 'POST 3', postContent: 'CONTENT 3', categoryId: "카테고리", price: 5000, latitude: 36.1394833, longitude: 128.3545733 },
        { postTitle: 'POST 4', postContent: 'CONTENT 4', categoryId: "카테고리", price: 6000, latitude: 36.1494833, longitude: 128.3245733 },
        { postTitle: 'POST 5', postContent: 'CONTENT 5', categoryId: "카테고리", price: 7000, latitude: 36.1594833, longitude: 128.3645733 },
      ],
    }
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.renderCarouselItem = this.renderCarouselItem.bind(this)
  }
  /**
   * Obtain permission to check the user's device and obtain the location accordingly.
   */
  requestLocationPermission = async () => {
    this._isMounted = true;

    //if user device is Android
    if (Platform.OS === 'android' && this._isMounted == true) {
      const response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (response === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {

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
    this._isMounted = true;
    if (this._isMounted) {
      this.requestLocationPermission();
    }
  }

  onRegionChangeComplete = (region: initialPositionProps) => {
    this.setState({ initialPosition: region });
  }

  /**
   * Every time you turn the screen of a post, it shows the contents of the post corresponding to a marker.
   */
  onCarouselItemChange = ({ index }: { index: number }) => {
    let location = this.state.coordinates[index];

    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    this.mapRef.current.animateToRegion(region);
  }

  renderCarouselItem = ({ item }: { item: CoordProps }) => {
    return (
      <View
        style={styles.cardContainer}>
        <Text style={styles.titleStyle}>{item.postTitle}</Text>
        <Text style={styles.contentStyle}>{item.postContent}</Text>
        <Text style={styles.postStyle}>{item.latitude}, {item.longitude}</Text>
        <Button onPress={() => this.props.navigation.navigate('DetailPostScreen', {
          postTitle: item.postTitle,
          postContent: item.postContent,
          categoryId: item.categoryId,
          price: item.price,
        })}
          title="게시물 이동하기" />
      </View>
    )
  }
  /**
   * When you click a marker, go to the marker screen in the middle of the screen and show the corresponding carousel UI.
   */
  onMarkerPressed = (location: CoordProps, index: number) => {
    const { onRegionChangeComplete } = this.props;
    const region = {
      latitude: location.latitude,
      longitude: location.latitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0422,
    }

    onRegionChangeComplete(region);
    //this.mapRef.current.animateToRegion(region);
    this.mapRef.current.onSnapToItem(index);
  }

  componentWillUnMount() {
    this._isMounted = false;
  }

  render() {
    const initialPosition = this.state.initialPosition
    return (
      <View>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={this.mapRef}
            style={styles.map}
            region={initialPosition}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            tracksViewChanges={false}
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
                  title={marker.postTitle}>
                </Marker>
              ))}
          </MapView>

          <Carousel
            ref={this.carousel}
            data={this.state.coordinates}
            containerCustomStyle={styles.carousel}
            renderItem={this.renderCarouselItem}
            onSnapToItem={(index) => this.onCarouselItemChange({ index })}
            removeClippedSubviews={false}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
          />
        </View>
      </View>
    );
  }
}


/**
 * Height is expressed as a number, but must be expressed absolutely later.
 */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    minHeight: 700,
  },
  carousel: {
    position: 'absolute',
    marginBottom: 30,
    marginTop: 550,
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
