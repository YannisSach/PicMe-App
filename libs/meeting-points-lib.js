/*
The library used to fetch meeting points on the map or 
*/

import MapView from 'react-native-maps';
var i=0;
var j=0;
var serverResponse = new Array();
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
		return responseJson;
	})		
}

function getMeetingPointMarkers(playerId){
	fetch('http://picmetest.herokuapp.com/game/meetingpoints/'+playerId, { //I didn't want to rewrite it but it's easier this way
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
	.then((response) => {for(var x in response.json()){j++;}  alert (j);return response})
		.then((responseJson) => {
			for(var x in responseJson){
				i++;
			}
		alert(i + " " + j);
		//markAllMeetingPoints(responseJson);
	})	
}

export default getMeetingPointMarkers;

 function markKaramuza(){   
	return (<MapView.Marker
		coordinate={{latitude: karamuza.coords.latitude,
		longitude: karamuza.coords.longitude}}
		title={"Karamuza"}
		description={"0 active players"}
	/>)

 }

 function markMeetingPoint(aMeetingPoint){
	 //var coordinate = {latitude: aMeetingPoint.coordinates.latitude, longitude: aMeetingPoint.coordinates.longitude};
		//var title = "Name of the meeting point";
		var description = "There are " + aMeetingPoint.activePlayers+ " active players";
		alert("Repeat"); //error here
	 /*return (<MapView.Marker
		 coordinate = {{latitude: aMeetingPoint.coordinates.latitude, longitude: aMeetingPoint.coordinates.longitude}}
		 title = {"Name of the meeting point"}
		 description = {"There are " + aMeetingPoint.activePlayers+ " active players"}
	 />)*/
 }
 
 function markAllMeetingPoints(meetingPoints){
	 var result;
	 var marker;
	 var i;
	 for(var meetingPoint in meetingPoints){
		 marker = markMeetingPoint(meetingPoint);
		 //result.push(marker);
	 }
	 return result
 }
 
 