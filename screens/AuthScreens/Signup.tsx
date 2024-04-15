import { Text, View, StyleSheet, TouchableOpacity,Image,TextInput, KeyboardAvoidingView, Dimensions } from 'react-native';
import React, { Component } from 'react';
import Login from './Login';
import { updateEmail,updatePassword, updateUsername, signup } from '../../actions/user';
import {styles} from '../../assets/helps/styles/style'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class Signup extends Component {

    state = {
        repeat:''//  is the repesat password
    }

    // is for login function
    onLoginPress = () => {
        if(this.props.user.password == this.state.repeat && this.props.user.username !== ''){
            return this.props.signup()
        }
        else{
            alert("Not identical")
        }
    }
  render() {
    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style= {{flex:1}}>
               <View style={{   flex: 1,   alignItems: 'center',  }}>
                          {/* <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} /> */}

              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Username</Text>
              </View>
              <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'your username'}
              onChangeText={input=>this.props.updateUsername(input)}
              value={this.props.user.username}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Email</Text>
              </View>
              <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'example@example.com'}
              // value={this.props.user.email}
              // onChangeText={input=>this.props.updateEmail(input)}
              onChangeText={input=>this.props.updateEmail(input)}
              value={this.props.user.email}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Password</Text>
              </View>
              <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'Passcode123'}
              // value={this.props.user.password}
              onChangeText={input=>this.props.updatePassword(input)}
              value={this.props.user.password}
              // onChangeText={input=>this.props.updatePassword(input)}
              secureTextEntry={true}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Repeat Password</Text>
              </View>
              <TextInput 
              style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
              placeholderTextColor={'grey'}
              placeholder={'Repeat Passcode123'}
              // value={this.props.user.password}
              onChangeText={input=>this.setState({repeat: input})} //(property:string)
              value={this.state.repeat}

              // onChangeText={input=>this.props.updatePassword(input)}
              secureTextEntry={true}
              />
              <TouchableOpacity style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center', margin:30}}
              onPress={()=>this.onLoginPress()}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>SIGNUP</Text>
              </TouchableOpacity>

      </View>
      </KeyboardAvoidingView>

    );
  }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({ updateEmail,updatePassword, updateUsername,signup }, dispatch)
}

const MapStateToProps =(state) =>{
    return {user: state.user}
}
export default connect(MapStateToProps, mapDispatchToProps)(Signup)

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'red',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });
  