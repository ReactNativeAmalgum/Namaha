import React, { Component } from 'react';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import { Text, View, StyleSheet, TouchableOpacity, TextInput,SafeAreaView, Dimensions, Image,Platform, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions/index';
import { updateNextPhoto, removeImage } from '../../actions/post';
import { getUser } from '../../actions/user';
import { styles } from '../../assets/helps/styles/style';
import { FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

// import SafeAreaView from '../../assets/helps/styles/SafeAreaView';
// for all type screen window
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class PostScreen extends Component {
  // state ={
  //   urlChosen:undefined
  // }
  constructor(props) {
    super(props)
    this.state={

      urlChosen:undefined,
      capturedImage:null
      // startCamera:false
    }
  }


  openLibrary = async () =>{
    try {
      const {status} = await Permissions.askAsync(Permissions.CAMERA)
      if(status === 'granted'){
        const image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing:true
        })
        if(!image.cancelled){
          // const url = await this.props.uploadPhoto(image)
          const url = await this.props.uploadPhoto(image)
          // this.setState({url:url})
           this.props.updateNextPhoto(url)
           this.setState({urlChosen: url})
        }
      }
    } catch (error) {
      return console.log(error),
      alert(error)
    }
  }


  changeChosenUrl = (url) =>{
    this.setState({urlChosen:url})
  }
  removeImage = (url) =>{
    const position = this.props.post.photos.indexOf(url)
    this.props.removeImage(position)
    if(this.props.post.photos.length == 2){
      this.setState({urlChosen: this.props.post.photos[0]})

    }else{
      this.setState({urlChosen:undefined})
    }
  }

  uploadPost = () =>{
    this.props.navigation.navigate("PostCheckout")
  }
  cameraScreen = () =>{
    this.props.navigation.navigate("cameraView")
  }
  onChooseImagePress = async() =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    if(status === 'granted'){
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[1,1],
        quality:0.5
      })
      if(!image.cancelled){
        const url = await this.props.uploadPhoto(image)
        this.props.updateNextPhoto(url)
        this.setState({urlChosen:url})
      }
    }
  }

  render() {
    return (

      <SafeAreaView style={{flex:1}}> 
        <View style ={(Platform.OS === 'ios') ? 
        {width:screenWidth,height:56,borderBottomColor:'grey', borderBottomWidth:1} :{width:screenWidth,height:56,alignItems:'center',flexDirection:'row',justifyContent:'space-between', borderBottomColor:'blue',borderBottomWidth:1, marginTop:30 }}>
          {/* <Text style={{margin:10, fontWeight:'bold'}}>x</Text> */}
          <Text style={{margin:10,fontWeight:'bold',fontSize:22}}>Create New Post</Text>
          <TouchableOpacity style={{margin:10}} onPress={ () =>this.uploadPost()}>
            <Text style={{margin:0,fontWeight:'bold',color:'black',fontSize:22}}>Upload</Text>
          </TouchableOpacity>
        </View>   
        <View style={{width:screenWidth, height:300}} >
          {
            ( this.state.urlChosen == undefined) ?
            // width:300,marginLeft:45, bottom:3,height: 300
            <TouchableOpacity  style={{width:screenWidth, height:360, justifyContent:'center',alignItems:'center'}}onPress={() => this.openLibrary()}>
              <View style={{width:65, height:65,borderRadius:65/2,backgroundColor:'#00c4cc'}}>
                <Text style={{color:'white',fontSize:35,marginTop:6,alignSelf:'center',justifyContent:'center'}}>+</Text>
              </View>
            </TouchableOpacity>
            :
            <View  style={{ width:screenWidth,height: 300}}>
              <Image source={{uri:this.state.urlChosen}} style={{ padding:1,width:screenWidth,height: 300}} />  
              <TouchableOpacity onPress={() => this.removeImage(this.state.urlChosen)} style={{position:'absolute',bottom:30,right:40}} >
                  <FontAwesome name="trash" color={"black"} size={40} />
              </TouchableOpacity>
            </View>
          }
        </View> 
        <View style={{flexDirection:'row',width:screenWidth, justifyContent:'center', alignItems:'center'}}>
          {
            (this.props.post.photos == undefined || this.props.post.photos?.length == 3  || this.props.post.photos?.length == 0)            
            ?
            null
            :
          <TouchableOpacity style={{width: 95,height: 90, backgroundColor:'rgba(0,0,0,0.1)',justifyContent:'center',alignItems:'center',margin:5,borderRadius:12}} onPress={() => this.openLibrary()}>
            <View style={{width:40, height:40,borderRadius:20,backgroundColor:'rgba(0,0,0,0.1)'}}>
              <Text style={{color:'white',fontSize:29,alignSelf:'center',justifyContent:'center'}}>+</Text>
            </View>
          </TouchableOpacity>
          }

          {
             this.props.post.photos?.map(e => 
              <TouchableOpacity onPress={() => this.changeChosenUrl(e)}>
                <Image source={{uri: e}} style={{width:95,height:90,backgroundColor:'rgba(0,0,0,0.1)',margin:5,borderRadius:12}}/>
              </TouchableOpacity>
              )
          }
        </View>
        <View style={{justifyContent:'center',position:'absolute' ,
        alignItems:'center',left:screenWidth*0.5,marginTop:screenHeight*0.75}}>
        <TouchableOpacity
          onPress={() => this.onChooseImagePress()}
          style={{
            width:65, 
            height:65,
            borderRadius: 50,
            backgroundColor: '#00c4cc',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position:'absolute' ,
            
          }}
        >
         <FontAwesome size={35} name={'camera-retro'} />
        </TouchableOpacity>
        </View>
      
      </SafeAreaView>


    );
  }
}
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({ getUser, uploadPhoto, updateNextPhoto, removeImage }, dispatch)
}

const MapStateToProps =(state) =>{
    return {
      user: state.user,
      post: state.post
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(PostScreen)

