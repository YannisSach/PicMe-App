import React, { Component } from 'react';
import { AppRegistry, TextInput ,View, Text, Navigator} from 'react-native';
import Button from 'react-native-button';
import MainPage from './main-page';


var initState = {
    username: "",
    password: "",
}

var next_route = {title: 'MainPage', index: 1};
var navigator;
var self;

export default class LoginPage extends Component {
	 propTypes: {
        navigator: React.PropTypes.navigator.isRequired, //the Id of the player to cancel the game
    }
	
    constructor(props){ //initialixation of the object
        super(props);
        this.state = initState;
        self = this;
    }

    loginPost() {
        fetch('http://picmetest.herokuapp.com/player/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: self.state.username,
                password: self.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                    if (responseJson.success) {
                        alert("Correct Password");
                    }
                    else {
                        alert("Wrong username or password");
						navigator = this.props.navigator;
						navigator.replace(next_route);
                    }
                }
            )

    }

    handlePress_signup(){
        alert ("aloha xousi");

    }

    render() {
        return (
            <View  style={{padding: 50,flex:0}} >

                <Text >LOGIN</Text>
                <View>
                    <TextInput style={{ borderColor: 'gray', borderWidth: 1}}
                               onSubmitEditing={
                                   (text) => {
                                       alert(text.nativeEvent.text);
                                       //this.state.username = text
                                       this.setState({username: text.nativeEvent.text.trim()});
                                   }
                               }/>
                    <Text >PASSWORD</Text>

                    <TextInput style={{borderColor: 'red', borderWidth: 1, }}
                               onSubmitEditing={(text) => {

                                   //this.state.password = text
                                   this.setState({password: text.nativeEvent.text.trim()});
                                   alert(text.nativeEvent.text);
                               } }
                    />
                </View>
                <Button containerStyle={{height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                        style={{fontSize: 20, color: 'red'}} onPress= {() => {this.loginPost();}}>
                    PressMe
                </Button>
            </View>
        );
    }
}