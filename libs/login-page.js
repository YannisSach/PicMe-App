import React, { Component } from 'react';
import { AppRegistry, TextInput ,View, Text} from 'react-native';
import Button from 'react-native-button';



var initState = {
    username: "",
    password: "",
}

var self;

export default class LoginPage extends Component {

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
                        alert(responseJson.playerId);
                    }
                    else {
                        alert(responseJson.msg);
                    }
                }
            )

    }

    handlePress_signup(){
        alert ("aloha xousi");

    }

    render() {
        return (
            <View style={{paddingLeft: 10, }}>

                <Text style={{paddingBottom : 10,}}>LOGIN</Text>
                <View>
                    <TextInput style={{height: 50, borderColor: 'gray', borderWidth: 1}}
                               onSubmitEditing={
                                   (text) => {
                                       alert(text.nativeEvent.text);
                                       //this.state.username = text
                                       this.setState({username: text.nativeEvent.text.trim()});
                                   }
                               }/>
                    <Text style={{paddingBottom : 10,}}>PASSWORD</Text>

                    <TextInput style={{height: 50, borderColor: 'red', borderWidth: 1, }}
                               onSubmitEditing={(text) => {

                                   //this.state.password = text
                                   this.setState({password: text.nativeEvent.text.trim()});
                                   alert(text.nativeEvent.text);
                               } }
                    />
                </View>
                <Button containerStyle={{ padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                        style={{paddingBottom:40,fontSize: 20, color: 'red'}} onPress= {() => {this.loginPost();}}>
                    PressMe
                </Button>
            </View>
        );
    }
}