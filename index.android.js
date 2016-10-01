import React, { Component } from 'react';
import { AppRegistry, TextInput ,View, Text} from 'react-native';
import Button from 'react-native-button';

var initState = {
  username: "",
  password: "",
  passwordsignup_1: "", 
  passwordsignup_2: "", 
  usernamesignup: "",
}

var self; 

class login extends Component {

  constructor(props){ //initialixation of the object 
          super(props);
          this.state = initState;
          self = this;
        }

   handlePress() {
      fetch('http://picmetest.herokuapp.com/player/login', {
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

  handlePress_signup(){
    alert ("aloha xousi");

  }




render() {
return (
      <View style={{paddingLeft: 10, }}>

        <Text style={{paddingBottom : 10,}}>LOGIN</Text>
          <View>
              <TextInput style={{height: 50, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={
                (text) => {
                  alert(text),
                  this.state.username = text
                }
            }/>
          
          <Text style={{paddingBottom : 10,}}>PASSWORD</Text>
  
              <TextInput style={{height: 50, borderColor: 'red', borderWidth: 1, }}
               onSubmitEditing={(text) => {
                alert(text),
                this.state.password = text
              } }
              />
          </View>

        <Button containerStyle={{ padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{paddingBottom:40,fontSize: 20, color: 'red'}} onPress=
          {alert("hello"),
             alert(this.state.username),
             alert(this.state.password)

            //this.handlePress
          }>
          PressMe 
        </Button>


        <Text style={{paddingBottom : 10,}}>SIGNUP</Text>

          <View>
              <TextInput style={{height: 50, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={(text) => this.state.usernamesignup = text }/>
          </View>
        <Text style={{paddingBottom : 10,}}>PASSWORD</Text>
          <View>
              <TextInput style={{height: 50, borderColor: 'red', borderWidth: 1, }}
               onSubmitEditing={(text) => this.state.passwordsignup_1 = text }
              />
          </View>
          <Text style={{paddingBottom : 10,}}> REPEAT  PASSWORD</Text>
          <View>
              <TextInput style={{height: 50, borderColor: 'red', borderWidth: 1, }}
               onSubmitEditing={(text) => this.state.passwordsignup_2 = text }
              />
          </View>

        <Button containerStyle={{ padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{paddingBottom:40,fontSize: 20, color: 'red'}} onPress={this.handlePress_signup}>
          PressMe 
        </Button>

      </View>
    );
  }
}

AppRegistry.registerComponent('login', () => login);