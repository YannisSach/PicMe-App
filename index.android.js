
import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import Main from "./libs/main-page";
import LoginPage from "./libs/login-page"

class PicMe extends Component {
	render() {
        return (
			<LoginPage/>
        );
    }
}

AppRegistry.registerComponent('PicMe', () => PicMe);