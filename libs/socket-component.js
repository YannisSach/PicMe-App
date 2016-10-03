/* 
A simple component for socket testing
*/
var self;
var initState = {
	socket_message: "Haven't received anything yet..."
}
var ws;

function sendToServer(msg){
	ws.send(msg);
	alert("Message sent!")
}

function initWebsocket{
	var ws = new WebSocket('ws://host.com/path');
	ws.onopen = () => {
		alert("New socket created");
	};

	ws.onmessage = (e) => {
		self.setState({socket_message: e.data});
	};

	ws.onerror = (e) => {
	alert(e.message);
	};

	ws.onclose = (e) => {
	alert(e.code, e.reason);
	};
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
			<TextInput placeholder="Send a message to server"  onSubmitEditing={(text) => {sendToServer(text.nativeEvent.text)}}/>
			<Text>
				Server said:{"\n"}
				{this.state.socket_message}
			</Text>
		   </View>
        );
    }
}