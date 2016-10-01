
import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import Main from "./libs/main";

class PicMe extends Component {
	render() {
        return (
          <Main/> 
        );
    }
}

AppRegistry.registerComponent('PicMe', () => PicMe);