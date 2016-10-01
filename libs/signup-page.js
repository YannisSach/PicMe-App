 /* Implementetion of the signup page
 */
import React, { Component } from 'react';
import { AppRegistry, TextInput ,View, Text} from 'react-native';
import Button from 'react-native-button';
 
var self; 

var initState = {
  username: "",
  password1: "", 
  password1: "", 
} 
 
 export default class SignUpPage extends Component {
	 
	constructor(props){ //initialixation of the object 
          super(props);
          this.state = initState;
          self = this;
        }

	signUpPost() {
      fetch('http://picmetest.herokuapp.com/player/signup', {
              method: 'POST',
              headers: {
               'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: self.state.username,
                password: self.state.password, 
             })
      })
      .then((response) => response.json())
      .then((responseJson) => {
            if (responseJson.success) {
                alert(responseJson.playerId);
            }
            else {
              alert(responseJson.msg);
            }
          }
        )
	}	
	
	render(){
		return(<Text style={{paddingBottom : 10,}}>SIGNUP</Text>
				<View>
				  <TextInput style={{height: 50, borderColor: 'gray', borderWidth: 1}}
				  onSubmitEditing={(text) => this.setState({username: text.nativeEvent.text.trim()}) }/>
				</View>
				<Text style={{paddingBottom : 10,}}>PASSWORD</Text>
				<View>
				  <TextInput style={{height: 50, borderColor: 'red', borderWidth: 1, }}
				   onSubmitEditing={(text) => this.setState({password1: text.nativeEvent.text.trim()})}
				  />
				</View>
				<Text style={{paddingBottom : 10,}}> REPEAT  PASSWORD</Text>
				<View>
				  <TextInput style={{height: 50, borderColor: 'red', borderWidth: 1, }}
				   onSubmitEditing={(text) => this.setState({password2: text.nativeEvent.text.trim()})}
				  />
				</View>

				<Button containerStyle={{ padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
			  style={{paddingBottom:40,fontSize: 20, color: 'red'}} onPress={this.signUpPost}>
			  PressMe 
				</Button>

		  </View>
		)  
	}
}