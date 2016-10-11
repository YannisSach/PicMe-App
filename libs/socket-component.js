/* 
   A simple component for socket testing
 */

import React, { Component } from 'react';
window.navigator.userAgent = 'ReactNative';
var io = require('socket.io-client/socket.io');

import {
    TextInput,
    Text,
    Websocket,
    View,
} from 'react-native';

var self;
var initState = {
    socket_message: "Haven't received anything yet..."
}
var socket
;

function sendToServer(){
    socket.emit('newGame', { playerId: "57efeb36a61b0f1590e57355", meeting: '57efd564f36d2867db3b5993' }); 
    alert("Message sent!")
}

function initWebsocket(){
    socket = io.connect('http://192.168.1.9:8000', {transports: ['websocket']});
    
    // Connect! 
    //socket.connect();
    
    // An event to be fired on connection to socket 
    socket.on('connect', () => {
	console.log('Wahey -> connected!');
    });
    
    // Event called when 'someEvent' it emitted by server 
    socket.on('wait', (data) => {
	alert(data.wait)
    });
}

export default class Socket extends Component {
    
    
    constructor(props){
        super(props);
        this.state = initState;
        self = this;
	initWebsocket();
    }

    
    render() {
        return (
	    <View>
	    <TextInput placeholder="Send a message to server"  onSubmitEditing={(text) => {sendToServer()}}/>
	    <Text>
	    Server said:{"\n"}
	    {this.state.socket_message}
	    </Text>
	    </View>
        );
    }
}
