/*
The library used to fetch meeting points on the map or 
*/

exports.getMeetingPoints(playerId){
	fetch('http://picmetest.herokuapp.com/game/meetingpoints/'+playerId, { //how am i supposed to use player id??? i hava an idea...
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
	.then((response) => response.json())
    .then((responseJson) => {
		alert(responseJson);
		return responseJson;
	})		
}

exports.getMeetingPointMarkers(playerId){
	var responseJson = exports.getMeetingPoints(playerId);	
	return markAllMeetingPoints(responseJson); //hope it works
}

 function markKaramuza(){   
	return (<MapView.Marker
		coordinate={{latitude: karamuza.coords.latitude,
		longitude: karamuza.coords.longitude}}
		title={"Karamuza"}
		description={"0 active players"}
	/>)

 }

 function markMeetingPoint(aMeetingPoint){
	 return (<MapView.Marker
		 coordinate = {{latitude: aMeetingPoint.latitude, longitude: longitude.aMeetingPoint.longitude}}
		 title = {"Name of the meeting point"}
		 description = {"There are " + aMeetingPoint.activePlayers+ " active players"}
	 />)
 }
 
 function markAllMeetingPoints(meetingPoints){
	 var meetingPoints;
	 var result;
	 meetingPoints = meetingPoints.map(markMeetingPoint);
	 alert(meetingPoints.length); //print array size
	 for(i=0; i<meetingPoints.length; i++){
		 result.push(meetingPoints);
	 }
	 return result
 }
 
 