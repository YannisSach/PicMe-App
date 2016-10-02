/*
 The library used to fetch meeting points on the map or
 */
import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import MapView from 'react-native-maps';
var i=0;
var j=0;
var serverResponse = new Array();
var karamuza = {coords: {longitude:23.79822 , latitude:38.05989 }, allowed: 2};
var self;

initState = {}

function getMeetingPoints(playerId){
    fetch('http://picmetest.herokuapp.com/game/meetingpoints/'+playerId, { //how am i supposed to use player id??? i hava an idea...
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {})
        .then((responseJson) => {
            alert(responseJson.length());
            return "hello";
        })
}

function getMeetingPointMarkers(playerId){
    fetch('http://picmetest.herokuapp.com/game/meetingpoints/'+playerId, { //I didn't want to rewrite it but it's easier this way
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {var markers = markAllMeetingPoints(responseJson.meetingPoints); self.setState({meetingPoints: markers});})

}


function markKaramuza(){
    return (<MapView.Marker
        coordinate={{latitude: 38.05989,
            longitude: 23.79822 }}
        title={"Karamuza"}
        description={"0 active players"}
    />)

}

function markMeetingPoint(aMeetingPoint,key){
    //alert(aMeetingPoint.coordinates.longitude);
    return (<MapView.Marker
        coordinate = {{latitude: parseFloat(aMeetingPoint.coordinates.latitude), longitude: parseFloat( aMeetingPoint.coordinates.longitude)}}
        title = {"Name of the meeting point"}
        description = {"There are " + aMeetingPoint.activePlayers+ " active players"}
        key = {key}
    />)
}

function markAllMeetingPoints(meetingPoints){
    var result = [];
    var marker;
    var i;
    //alert(meetingPoints.length);
    for(i=0; i<meetingPoints.length; i++){
        marker = markMeetingPoint(meetingPoints[i],i);
        marker.key = i;
        result.push(marker);
    }
    //alert()
    return result;
}

export default class MeetingPointMap extends Component{

    propTypes: {
        playerId: React.PropTypes.string.isRequired, //the Id of the player to cancel the game
    }

    constructor(props){
        super(props);
        this.state = initState;
        self = this;
        getMeetingPointMarkers(this.props.playerId);
    }

    render(){
        return(
            <MapView style={styles.map, {flex: 2}} showsUserLocation={true} followUserLocation={true} fitToElements={true}>
                {this.state.meetingPoints}
            </MapView>)
    }

}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});