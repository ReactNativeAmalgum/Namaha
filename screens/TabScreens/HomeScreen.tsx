import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts, likePost, unLikePost, savePost,unSavePost,uploadPost} from '../../actions/post'
import PostComponent from '../Components/PostComponent'
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';
import Comments from '../Components/Comments';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


class HomeScreen extends React.Component {
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount = () =>{
        this.props.getPosts()
        
    }
    goToMessages =() =>{
        try{
            this.props.navigation.navigate('ChatScreen')
        }catch(e){
            alert(e)
        }
    }

    render(){
        
        
        return (
        
            <SafeAreaView style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
            {/* <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight+50,}} /> */}
                <View style={{height:50, width:screenWidth, borderBottomColor:'rgba(0,0,0,0.1)', borderBottomWidth:0.5, justifyContent:'space-between', flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => this.signOutUser()}>
                        <Image style={{width:140, height:30, marginHorizontal:15}} source={require('../../assets/background/final3.gif')}/> 
                    </TouchableOpacity>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('SavedPosts')}>
                            <Image source={require('../../assets/images/save-post.png')} style={{width:25,height:25, margin:10,bottom:4}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>this.goToMessages()} style={{width:25,height:25, margin:10,bottom:4}} >
                        <FontAwesome5 name='comment-dots'size={24} color="blue" />                      
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() =>this.goToMessages()}>
                            <Image source={require('../../assets/images/sh.png')} style={{width:25,height:25, margin:10, bottom:5}} />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <FlatList
                
                data={this.props.post.feed}
                keyExtractor={(item) => JSON.stringify(item.uid)}
                renderItem={({item}) => (
                    <PostComponent 
                    item={item}
                    user={this.props.user}
                    likePost={(item)=>this.props.likePost(item)}
                    unLikePost={(item)=>this.props.unLikePost(item)}
                    savePost={(item)=>this.props.savePost(item)}
                    unSavePost={(item)=>this.props.unSavePost(item)}

                    navigation={this.props.navigation}
                    />
                    
                )}
                />

            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts, likePost, unLikePost, savePost,unSavePost}, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)







