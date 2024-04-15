import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { getUser } from '../../actions/user';
// import { styles } from '../../assets/helps/styles/style';
// for all type screen window


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const image  = require('../../assets/background/Namaha1.gif')
class Welcome extends Component {

  componentDidMount = () =>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.getUser(user.uid)
        if(this.props.user != null)
          this.props.navigation.navigate('StackNavigator')
          this.props.navigation.reset({
            index: 0,
            routes: [{name:'StackNavigator'}]
          })
          
      }
      else{
        this.props.navigation.navigate('Login')
      }
    })

    
  }
  render() {
    return (

      <View style ={{flex:1}}> 
        {/* <Image
          style={{flex:1,width: screenWidth, height: screenHeight}}
          source={require('../../assets/background/Namaha1.gif')} /> */}
          <ImageBackground  source={image} style={styles.image}/>
      </View>


    );
  }
}
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({getUser }, dispatch)
}

const MapStateToProps =(state) =>{
    return {user: state.user}
}
export default connect(MapStateToProps, mapDispatchToProps)(Welcome)


const styles = StyleSheet.create({
  logo:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    fontSize:30,
    fontWeight:'bold',
    fontFamily:'logofont',
    marginVertical:40,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
})