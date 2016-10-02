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

var self;
var playerId;
var myNumber = -1;
var othersNumber = -1;
var initState = {
	res : "Nothing", 
	postcnt: 0, 
	latitude: -1, 
	longitude: -1,
	location_msg: "Unknown Location\n", 
	dist_msg: "Can't Calculate Distance\n",
};

var karamuza = {coords: {longitude:23.79822 , latitude:38.05989 }, allowed: 2};
var waiting = false;	


var persistantPost = function(user_pressed){
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
					else{
						alert("Returning...");
						self.props.afterNewGame.call(this,"returned");
						//return {myNumber: myNumber, othersNumber: othersNumber}
					}
				}
			)
}

function foo(){
	return "Hello!!!";
}


export default class NewGameButton extends Component{
	propTypes: {
		playerId: React.PropTypes.string.isRequired, //the Id of the player to cancel the game
		afterNewGame: React.PropTypes.func,
		debug: React.PropTypes.bool
    }
	
	defaultProps = {
		debug: false
	}
	
	constructor(props) {
		super(props);
		playerId = this.props.playerId;
		self = this;
		this.state = initState;
	 }
	
	render(){
		if(this.props.debug){
			return(
			<View>
				<TouchableOpacity onPress = {() => {persistantPost(true)}}>
						<Text style={{fontSize: 25, backgroundColor: 'green'}}  >New Game Libs </Text>
				</TouchableOpacity>
				<Text style={{fontSize: 13}}>
						Server Responded:{"\n"}
							{this.state.res}
				</Text>
				<Text style={{fontSize: 13}}>
						TotalPosts:{this.state.postcnt}
				</Text>
			</View>)
		}
		else{
			return (
				<View>
					<TouchableOpacity onPress = {() => {persistantPost(true)}}>
						<Text style={{fontSize: 25, backgroundColor: 'green'}}  >New Game Libs </Text>
					</TouchableOpacity>
				</View>
			)
		}
	}
}