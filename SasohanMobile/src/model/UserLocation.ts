import {Component} from 'react';

type initialPositionProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type CoordProps = {
  postTitle: string;
  postContent: string;
  categoryId: string;
  price: number;
  latitude: number;
  longitude: number;
};

type State = {
  isShowingCarousel: boolean;
  initialPosition: initialPositionProps;
  coordinates: CoordProps[];
};
