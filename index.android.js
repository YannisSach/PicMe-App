import React, { Component } from 'react';

import {
    AppRegistry,
} from 'react-native';

import MainPage from "./libs/main-page";
import LoginPage from "./libs/login-page"



class PicMe extends Component {
    render() {
        return (
            <MainPage/>
        );
    }
}

AppRegistry.registerComponent('PicMe', () => PicMe);