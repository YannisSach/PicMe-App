
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';
import CancelButton from './cancelButton';
import NewGameButton from './newGameButton';

var lib = require("./geolocation-lib");

var playerId = '57efe77cfb21a31d2810a6e9';
var myNumber = -1;
var othersNumber = -1;

var serverResponse = "Nothing";
//keeping a reference to the object when calling the functions
var self;
// We had to move functions out of the Component Class!!!
var initState = {
	res : "Nothing", 
	postcnt: 0, 
	latitude: -1, 
	longitude: -1,
	location_msg: "Unknown Location\n", 
	dist_msg: "Can't Calculate Distance\n",
}

var waiting = false;	
	
	
var karamuza = {coords: {longitude:23.79822 , latitude:38.05989 }, allowed: 2};

var meetingPoints;

//for debugging purposes
function doNothing(){
	alert("Sitting here doing nothing!");
}

//to be afterCancel action for the cancel button
function cancelGame(){
	waiting = false;
	return;
}

function compareInput(input){
	alert(othersNumber);
	if (input == othersNumber)
		alert("Congratulations waiting for your peer do submit his code...");
	else 
		alert("Sorry wrong code...");
}
	
function changeLocationMsg(){
	var message = "Unknown Location\n";
	if(self.state.longitude>0){
	message = "Longitude: " + self.state.longitude + "\n";
	message = message + "Latitude: " + self.state.latitude + "\n";
	}
	self.setState({location_msg: message});
	return;
}	

function changeDistanceMsg(){
	if(self.state.longitude<0){
		return;
	}
	var d = lib.getDistanceFromLatLonInKm(self.state.latitude, self.state.longitude, karamuza.coords.latitude, karamuza.coords.longitude);
	//alert(d);
	self.setState({dist_msg: d});
	return;
}

var persistantPost = function(user_pressed){
			//increase postcnt
			//var cnt = self.state.postcnt
			if (!lib.isPlayerNearHotSpot(self.state.latitude, self.state.longitude,karamuza)){
				alert("Sorry you can't play. You must be near a hotspot!")
				return;
			}
			if(waiting && user_pressed){
				alert("You have already asked for a new game");
				return;
			}
			waiting = true;
			self.setState({postcnt: self.state.postcnt+1});
			fetch('http://picmetest.herokuapp.com/game/newGame/'+ playerId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        //playerId: '57ed6f27dcba0f1f2b138b98' // eugene
						meeting: '57efd564f36d2867db3b5993'
				})
			})
			.then((response) => response.json())
                .then((responseJson) => {
					serverResponse = "wait : " + responseJson.wait + "\nYourNumber : " + responseJson.yourRandom + "\nOthersNumber : " + responseJson.othersRandom;
					//alert(serverResponse);
					//this.state = serverResponse;
					self.setState({res: serverResponse}); //print answer
					if (responseJson.yourRandom && responseJson.othersRandom) {
						myNumber = responseJson.yourRandom;
						othersNumber = responseJson.othersRandom;
						alert(othersNumber);
					}
					if(responseJson.wait){
						setTimeout(() => {persistantPost(false);}, 5000); // passing a reference not a call
					}
				}
			)
}

 function markKaramuza(){   
	return (<MapView.Marker
		coordinate={{latitude: karamuza.coords.latitude,
		longitude: karamuza.coords.longitude}}
		title={"Karamuza"}
		description={"0 active players"}
	/>)

 }

 function updatePosition(position){
	alert("Position Updated")
	self.setState({longitude: position.coords.longitude});
	self.setState({latitude: position.coords.latitude});
	changeLocationMsg();
	changeDistanceMsg();
 }
 
export default class MainPage extends Component{
	watchID: number

	constructor(props) {
		super(props);
		self = this;
		this.state = initState;
	 }
	 
	componentDidMount(){
		navigator.geolocation.getCurrentPosition(
					(newPosition) => {
						updatePosition(newPosition)
					},
					(error) => alert(error.message),
					{enableHighAccuracy: true, timeout: 500, maximumAge: 1000}
		);
		
		this.watchID = navigator.geolocation.watchPosition((newPosition) => {
			updatePosition(newPosition)
		}); 
	 }
	 
	componentWillUnmount(){
		navigator.geolocation.clearWatch(this.watchID);
	}
	
    render() {
        return (
            <View style={{
						flex: 1,
						flexDirection: 'column',
						}}
			>
				<NewGameButton playerId = {playerId} afterNewGame = {(a) => alert(a)} debug={true}/>
				<CancelButton  playerId={playerId} afterCancel = {() => alert("Game Canceled") } />	
				<Text style = {{fontSize:20 }}>
					Your Location:{"\n"}
					{this.state.location_msg} {"\n"}
					Your Distance from Karamuza:{"\n"}
					{this.state.dist_msg}{"\n"}
				</Text>
				<TouchableOpacity>
					<Text style={{fontSize: 25, backgroundColor: 'green'}}  > Fetch HotSpots </Text>
				</TouchableOpacity>
				<MapView style={styles.map, {flex: 2}} showsUserLocation={true} followUserLocation={true} fitToElements={true}>
					{markKaramuza()}
				</MapView>
				<TextInput onSubmitEditing={(text) => {compareInput(text.nativeEvent.text);}} placeholder="Enter Others Number Here" >
				</TextInput>
			</View>
        );
    }
}
			
const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

