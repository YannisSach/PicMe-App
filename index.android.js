
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';

class PicMe extends Component {

    clickMe() {
        navigator.geolocation.getCurrentPosition(function(position) {
          fetch('http://192.168.1.9:3000/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            alert(responseJson);
          })
          .catch((error) => { console.error(error); });
        });
    }

    render() {
        return (
                <MapView
                    style = { styles.map }
                    showsUserLocation = {true}
                />
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

AppRegistry.registerComponent('PicMe', () => PicMe);