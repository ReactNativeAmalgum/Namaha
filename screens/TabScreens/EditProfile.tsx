import React from 'react'
import { FontAwesome } from "@expo/vector-icons";

import { Text, View, Button, StyleSheet , TouchableOpacity, TextInput, Image, Dimensions, ImageBackground} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { updatePhoto, updateEmail, updatePassword, updateUsername, updateName,updateQuote, signup, updateUser,  } from '../../actions/user'
import { uploadPhoto , } from '../../actions'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class Edit extends React.Component {

    openLibrary = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        if (status === 'granted') {
            const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
            if(!image.cancelled ){
                const url = await this.props.uploadPhoto(image)
                this.props.updatePhoto(url)
            }
        }
    }


    async onEdit () {
        await this.props.updateUser()
        this.setState({message:'User edited successfully!'})
    }
    state = {
        message: ''
    }

    render(){
        this.props.navigation.setOptions({
            headerBackTitle: ' ',
            headerTitle:'Edit Profile'
        });
        
        return (
            <View style={{flex:1, alignItems:'center'}}>
                <ImageBackground
                    style={styles.imageBackgroundNb}
                    source={{uri: this.props.user.photo}}
                    resizeMode="cover"
                />
                <View style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        {
                        (this.props.user.photo == undefined) ?
                        <TouchableOpacity onPress={()=> this.openLibrary()} style={{alignItems: 'center', width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8, backgroundColor:'black',  margin:20, marginHorizontal:60,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.41,
                        shadowRadius: 9.11,
                        elevation: 14,}}>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=> this.openLibrary()} style={{alignItems: 'center', 
                        width:screenWidth/4,marginTop:-50, height:screenWidth/4, borderRadius:screenWidth/8, 
                        backgroundColor:'#b2ffff', margin:20, marginHorizontal:60,shadowColor: "#000",shadowOffset: {    width: 0,    height: 7,},shadowOpacity: 0.41,shadowRadius: 9.11, elevation: 14,}}>
                            <View style={{ backgroundColor:'#b2ffff',width:screenWidth/4.5, height:screenWidth/4, borderRadius:screenWidth/8}}>
                                <Image style={{ width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8}} source={{uri: this.props.user.photo}}/>
                            </View>
                        </TouchableOpacity>
                        }
                        <Text style={{color:'black', fontWeight:'bold' ,marginBottom:50, fontFamily:'Product-sans-bold'}} >Change the profile image</Text>
                    </View>
                    
                </View>
                <View style={{top:-30}}>
                <TextInput
                value={this.props.user.name}
                onChangeText={input => this.props.updateName(input)}
                placeholder='Name'
                placeholderTextColor="black"
                style={{width:screenWidth*.9, height:50, borderRadius:50, backgroundColor:'rgba(0,0,0, 0.03)', margin: 15, textAlign:'center', padding:15, color:'black', fontSize:15}}
                />
                <TextInput
                value={this.props.user.quote}
                onChangeText={input => this.props.updateQuote(input)}
                placeholder='Quote'
                placeholderTextColor="black"
                style={{width:screenWidth*.9, height:50, borderRadius:50, backgroundColor:'rgba(0,0,0, 0.03)', margin: 15, textAlign:'center', padding:15, color:'black', fontSize:15}}
                />
                </View>
                {/* <Text style={{color:'#51FF0D', fontSize:20, fontFamily:'Product-sans', top:30}}> {this.state.message} </Text> */}
                <TouchableOpacity onPress={() => this.onEdit()} style={{top:screenWidth*0.1,width:screenWidth*.9, alignItems:'center', backgroundColor:'#00c4cc', height:60, borderRadius:20, justifyContent:'center', shadowOffset: {width: 5, height: 5},shadowOpacity: 1,elevation: 3,}}>
                    <Text style={{fontSize: 20, fontWeight:'bold', color:'black', fontFamily:'Product-sans-bold'}}>Continue</Text>
                </TouchableOpacity>

                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    imageBackgroundNb: {
        width: '100%',
        height: 250,
        color:'#00BFFF',
        backgroundColor:'#00BFFF',
        opacity:0.70

    },
})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUsername, updateName, signup, updateQuote,  }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)