
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

var lib = require("./libs/geolocation-lib");

var myNumber, othersNumber, intervalId;

var serverResponse = "Nothing";
//keeping a reference to the object when calling the functions
var self;
// We had to move functions out of the Component Class!!!


	
function changeLocationMsg(){
	var message = "Unknown Location\n";
	if(self.state.longitude>0){
	message = "Longitude: " + self.state.longitude + "\n";
	message = message + "Latitude: " + self.state.latitude + "\n";
	}
	self.setState({location_msg: message});
	return;
}	
	
var persistantPost = function(){
			//increase postcnt
			//var cnt = self.state.postcnt
			self.setState({postcnt: self.state.postcnt+1});
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
					serverResponse = "wait : " + responseJson.wait + "\nYourNumber : " + responseJson.yourRandom + "\nOthersNumber : " + responseJson.othersNumber;
					//alert(serverResponse);
					//this.state = serverResponse;
					self.setState({res: serverResponse}); //print answer
					if (responseJson.yourRandom && responseJson.othersRandom) {
						myNumber = responseJson.yourRandom;
						othersNumber = responseJson.othersRandom;
					}
					if(responseJson.wait){
						setTimeout(() => {persistantPost();}, 5000); // passing a reference not a call
					}
				}
			)
}
			
    
	


class PicMe extends Component {
	
    testMe () {
        // setting check to false leads to infinite loop
        check = false;
        alert(check);
		testMe2();
    }

	 constructor(props) {
		super(props);
		this.state = {res : "Nothing", postcnt: 0, location_msg: "Unknown Location\n"};
		setInterval(
			() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						self.setState({longitude: position.coords.longitude});
						self.setState({latitude: position.coords.latitude});
					}
				);
				changeLocationMsg()
			}, 2000)
	 }
    
	render() {
        /*let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };*/
		self = this; //get reference of the class
		var a = lib.getDistanceFromLatLonInKm(1,2,3,5);
        return (
            <View >
				<TouchableOpacity onPress = {persistantPost}>
					<Text style={{fontSize: 25}}>PostMe </Text>
				</TouchableOpacity>
				<Text style={{fontSize: 13}}>
					Server Responded:{"\n"}
						{this.state.res}
				</Text>
				<Text style={{fontSize: 13}}>
					TotalPosts:{this.state.postcnt}
				</Text>
				<Text style = {{fontSize:30 }}>
					{this.state.location_msg}
				</Text>
			</View>
			
            /*<TouchableOpacity onPress = {this.testMe}>
                <Image source={pic} style={{width: 193, height: 110}}/>
            </TouchableOpacity>*/
            
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