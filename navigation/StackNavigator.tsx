// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity, Button, Alert, } from 'react-native';
import * as firebase from 'firebase'
import TabNavigator from './TabNavigator';
import PostCheckout from '../screens/TabScreens/upload/PostCheckout'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import PostScreen from '../screens/TabScreens/PostScreen';
import {uploadPost} from '../actions/post'
import { getPosts } from '../actions/post';
import SavedPosts from '../screens/TabScreens/HeaderScreens/SavedPosts';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';
import { BorderlessButton } from 'react-native-gesture-handler';
import OnePost from '../screens/TabScreens/OnePost';
import EditProfile from '../screens/TabScreens/EditProfile';
import cameraView from '../screens/TabScreens/cameraView';
import cameraEdit from '../screens/TabScreens/cameraEdit';
import ViewUserImg from '../screens/TabScreens/upload/ViewUserImg';
import Comments from '../screens/Components/Comments';
const Stack = createNativeStackNavigator()

class MyStack extends React.Component{

    uploadPost =() =>{
        this.props.navigation.navigate('TabNavigator')
        Alert.alert('Upload','Succesfully 👍')
        this.props.uploadPost()
        this.props.getPosts()
    }

    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}}/>
                <Stack.Screen name="SavedPosts" component={SavedPosts}/>
                <Stack.Screen name="OnePost" component={OnePost}/>
                <Stack.Screen name="EditProfile" component={EditProfile}
                options={{
                    headerShown:false
                }}/>
                <Stack.Screen name="cameraEdit" component={cameraEdit}/>
                <Stack.Screen name="Comments" component={Comments}/>
                {/* <Stack.Screen name="ChatScreen" component={} */}
                    options={{
                        headerShown:true,
                        headerTitle:""
                        // headerRight:() =>(
                        //     <View>
                        //      <FontAwesome5 name='comment-dots'size={23} color="blue" />                      
                        //     </View>
                        // )
                    }}
                />
                <Stack.Screen name="cameraView" component={cameraView} options={{
                    headerShown:false
                    }}/>
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
                    headerStyle:{
                        backgroundColor:'white'
                    }
                    
                }}/>
                <Stack.Screen name="viewUserImg" component={ViewUserImg}
                options={{
                    headerShown:false
                }}
                />


                <Stack.Screen name="PostCheckout" component={PostCheckout} 
                    options={{
                        headerShown:true, 
                        headerTitle:"See your post",
                        headerRight: () => (
                            <TouchableOpacity onPress={() =>this.uploadPost()}>
                                <FontAwesome name="check" color={'blue'} size={25}/>
                            </TouchableOpacity>
                        )
                    }}/>
        
            </Stack.Navigator>
        )
        
    }

}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({  uploadPost, getPosts }, dispatch)
}

const MapStateToProps =(state) =>{
    return {
      user: state.user,
      post: state.post
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(MyStack)