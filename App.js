import { StatusBar } from 'expo-status-bar';
import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from 'react-native';
import axios from 'axios';

const API_KEY = "9edb618b344cf5285569e5c494dc97a2";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async(latitude,longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log(data);
  };

  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      const {
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.setState({isLoading: false});
      this.getWeather(latitude,longitude);
    } catch (error) {
      Alert.alert("Can`t find you mafucker!", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}