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

function postCancel(playerId){
    //increase postcnt
    //var cnt = self.state.postcnt
    fetch('http://picmetest.herokuapp.com/game/cancel/'+ playerId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            //playerId: '57ed6f27dcba0f1f2b138b98' // eugene
            meeting: '57efd564f36d2867db3b5993'
        })
    })
        .then((response) => alert("Canceling game..."))
    /*    .then((responseJson) => {

     }
     }
     )
     */
}

export default class CancelButton extends Component{
    propTypes: {
        playerId: React.PropTypes.string.isRequired, //the Id of the player to cancel the game
        afterCancel: React.PropTypes.func
    }

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress = {() => {postCancel(this.props.playerId),this.props.afterCancel.call()}}>
                    <Text style={{fontSize: 25, backgroundColor: 'red'}}  >Cancel Game </Text>
                </TouchableOpacity>
            </View>)
    }
}