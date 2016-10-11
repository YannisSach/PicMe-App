import React, { Component } from 'react';

import {
    AppRegistry,
    Navigator,
    View,
} from 'react-native';

//import MainPage from "./libs/main-page";
//import LoginPage from "./libs/login-page";
import Socket from "./libs/socket-component";
window.navigator.userAgent = 'ReactNative';

import io from 'socket.io-client/socket.io';

var nav;
var self;

class PicMe extends Component {
    constructor(props){
	super(props);
	self = this;
    }
    render() {
	return (
	 
	    <Socket/>
	);
        /*return (
	   <Navigator
	   ref = 'navigator'
	   initialRoute={routes}
	   renderScene={(route, navigator) =>{
	   if(route.index ==0 ){
	   return <LoginPage navigator = {navigator}/>
	   }
	   else{
	   return <MainPage/>
	   }
	   }}
	   >
	   </Navigator>
	   );*/
		
    }
}

var routes = {title: 'Login Page', index: 0};

AppRegistry.registerComponent('PicMe', () => PicMe);
