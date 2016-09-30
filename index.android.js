
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
var serverResponse = "Nothing";
var self;
// We had to move functions out of the Component Class!!!

var testMe2= function(){
		alert ("test2");
		
	}

var simplePost = function(){
			alert("NewPost");
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
						setTimeout(() => {simplePost();}, 5000);
					}
				}
			)
}
			
    
	

/*	
var clickMe = function() {
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
					serverResponse = responseJsong
                    if (responseJson.yourRandom && responseJson.othersRandom) {
						myNumber = responseJson.yourRandom;
                        othersNumber = responseJson.othersRandom;
                        //setInterval(() => {}, 5000);
                        } else if (responseJson.wait) {

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

                    if (check) {
                        check = false;
                        clearInterval(intervalId);
                        // nothing gets executed here
                        // check = false;
                        // alert(check);
                    }
                }}
            ,2000
        );
        check = false;
    }
*/	
	
class PicMe extends Component {
	
    testMe () {
        // setting check to false leads to infinite loop
        check = false;
        alert(check);
		testMe2();
    }

	 constructor(props) {
		super(props);
		this.state = {res : "Nothing"};
	 }
    
	render() {
        /*let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };*/
		self = this;
        return (
            <View >
				<TouchableOpacity onPress = {simplePost.bind(this)}>
					<Text style={{fontSize: 25}}>PostMe </Text>
				</TouchableOpacity>
				<Text style={{fontSize: 25}}>
					Server Responded:{"\n"}
						{this.state.res}
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