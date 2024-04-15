import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { updateEmail,updatePassword, login,sendPasswordReset } from '../../actions/user';

// import { styles } from '../../assets/helps/styles/style';
// for all type screen window
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class ForgotPassword extends Component {
    state = {
        repeat:'',//  is the repesat password,
        loading:false
    }
    onSubmit = async (email) => {
      try {
        await firebase.auth().sendPasswordResetEmail(this.props.user.email);
        alert("Password reset link sent!");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
      setInterval
    };
  render() {
    return (

        <View style={{   flex: 1,   alignItems: 'center',}}>
        {/* <Image source={require('../../assets/backgrounds/back4.jpeg')} style={{   position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50}} /> */}
        {/* <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} /> */}

        <Text style={{fontSize:35, fontFamily:'logo-font', marginVertical:60, color:'#0095f6'}}>Reset-Password</Text>
        <View style={{marginTop:40}}>
 
        <View style={{width:screenWidth*0.9,  marginTop:10, }}>
            <Text style={{left:15}}>Email</Text>
          </View>
          <TextInput 
          style={{height: 50, width:screenWidth*0.9,  color:'black', paddingHorizontal:20, margin:0, borderRadius:10, borderColor:'grey', borderWidth:1}}
          placeholderTextColor={'grey'}
          placeholder={'example@example.com'}
          // onChangeText={input=>this.props.updateEmail(input)}
          onChangeText={input=>this.props.updateEmail(input)}
          value={this.props.user.email}
          />
             
        </View>

        <View style={{width:screenWidth, justifyContent:'center',alignItems:'center', margin:30}}>
            <TouchableOpacity style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center'}}
           onPress={()=> this.onSubmit()}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center', flexDirection:'row', margin:10}}
            onPress={()=> this.props.navigation.navigate('Login')}>
              <Text style={{fontSize:18}}>Back to  </Text>
              <Text style={{fontSize:18, fontWeight:'bold', color:'#0095f6'}}>Login!</Text>
            </TouchableOpacity>
            <View style={{position:'absolute', top:280, justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:18}}>from</Text>
              <Text style={{fontSize:20, fontWeight:'bold'}}> Namaha</Text>
            </View>
        </View>
        
        
        
        
      </View>

    );
  }
}
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({ updateEmail,updatePassword,sendPasswordReset, login, }, dispatch)
}

const MapStateToProps =(state) =>{
    return {user: state.user}
}
export default connect(MapStateToProps, mapDispatchToProps)(ForgotPassword)
