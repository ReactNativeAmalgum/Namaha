import React from "react";
import {Image,StyleSheet, Button,Text,View} from 'react-native'
import ImagePicker from 'expo-camera'
import { uploadPhoto } from '../../actions/index';
import { updateNextPhoto, removeImage } from '../../actions/post';
import { getUser } from '../../actions/user';
import { Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase'
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

class cameraView extends React.Component{
  static navigastionOptions ={
    header:null,
    urlChosen:''
  }
  onChooseImagePress = async() =>{
    const image = await ImagePicker.launchCameraAsync()
    if(!image.cancelled){
      const url = await this.props.uploadPhoto(image)
      this.setState({urlChosen:url})
    }
  }
  uploadPost =() =>{
    this.props.navigation.navigate("PostCheckout")
  }
  render(){

      return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity onPress={()=>this.onChooseImagePress()}>
            <Ionicons name="camera" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
      )
  }
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>{
  return bindActionCreators({ getUser, uploadPhoto, updateNextPhoto, removeImage }, dispatch)
}

const MapStateToProps =(state) =>{
  return {
    user: state.user,
    post: state.post
  }
}
export default connect(MapStateToProps, mapDispatchToProps)(cameraView)