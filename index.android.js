
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

//import MapView from 'react-native-maps';

var myNumber, othersNumber;

class PicMe extends Component {

    /*clickMe() {
        navigator.geolocation.getCurrentPosition(function(position) {
          fetch('http://192.168.1.9:3000/newGame', {
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
    }*/

    testMe() {
        fetch('http://picmetest.herokuapp.com/newGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //playerId: '57ed6f27dcba0f1f2b138b98' // eugene
                playerId: '57ed6f83dcba0f1f2b138bb9' // yanis
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert(responseJson.wait);
                alert(responseJson.yourRandom);
                if (responseJson.wait && responseJson.yourRandom) {
                    myNumber = responseJson.yourRandom;
                    othersNumber = responseJson.othersRandom;
                    // sleep for 2 seconds
                    setTimeout(
                        () => {
                            console.log('I do not leak!');
                            alert("onene");
                            this.testMe();
                        },
                        5000
                    );
                } else if (responseJson.wait) {
                    // sleep for 2 seconds
                    setTimeout(
                        () => {
                            console.log('I do not leak!');
                            alert("sakis");
                            this.testMe();
                        },
                        500
                    );
                } else if (!responseJson.wait) {
                    alert(myNumber + " " + othersNumber);
                } else
                    alert("Error");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <TouchableOpacity onPress ={this.testMe()}>
                <Image source={pic} style={{width: 193, height: 110}}/>
            </TouchableOpacity>
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