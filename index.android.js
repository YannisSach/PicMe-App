
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

var myNumber, othersNumber, intervalId;

var check = false;

class PicMe extends Component {

    clickMe() {
        intervalId = setInterval(
            () => {
                fetch('http://picmetest.herokuapp.com/newGame', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        //playerId: '57ed6f27dcba0f1f2b138b98' // eugene
                        playerId: '57ed6f83dcba0f1f2b138bb9' // yanis
                    })
                }).then((response) => response.json())
                    .then((responseJson) => {
                        //alert(responseJson.yourRandom);
                        setInterval(() => {}, 5000);
                        if (responseJson.wait && responseJson.yourRandom) {
                            myNumber = responseJson.yourRandom;
                            othersNumber = responseJson.othersRandom;
                            alert(myNumber);
                            setInterval(() => {}, 5000);
                        } else if (responseJson.wait) {
                            check = false;
                            alert("two");
                        } else if (!responseJson.wait) {
                            check = true;
                            alert(myNumber + " " + othersNumber);
                            setInterval(() => {}, 5000);
                        } else
                            alert("Error");
                    })
                    .catch((error) => {
                        console.error(error);
                        check = false;
                        clearInterval(intervalId);
                    });

                if (check) {
                    check = false;
                    clearInterval(intervalId);
                }
            }, 2000
        );
    }

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <TouchableOpacity onPress = {this.clickMe}>
                <Text>Test me</Text>
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