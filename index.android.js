
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

var clickMe = function() {
    intervalId = setInterval(
        () => {
            if (!check) {
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
                        //console.log(responseJson.yourRandom);
                        //setInterval(() => {}, 5000);
                        if (responseJson.yourRandom && responseJson.othersRandom) {
                            myNumber = responseJson.yourRandom;
                            othersNumber = responseJson.othersRandom;
                            console.log(myNumber);
                            check = !responseJson.wait;
                            //setInterval(() => {}, 5000);
                        } else if (responseJson.wait) {
                            check = false;
                            console.log("two");
                        } else if (!responseJson.wait) {
                            check = true;
                            console.log(myNumber + " " + othersNumber);
                            //setInterval(() => {}, 5000);
                        } else
                            alert("Error");
                    })
                    .catch((error) => {
                        console.error(error);
                        check = false;
                        clearInterval(intervalId);
                    });

            } else {
                clearInterval(intervalId);
                console.log("and here");
                check = false;
            }
        } ,2000
    );
};

var testMe = function() {
    // setting check to false leads to infinite loop
    check = false;
    alert(check);
};

class PicMe extends Component {

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View>
            <TouchableOpacity onPress = {clickMe}>
                <Image source={pic} style={{width: 193, height: 110}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {testMe}>
                <Image source={pic} style={{width: 193, height: 110}}/>
            </TouchableOpacity>
            </View>
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