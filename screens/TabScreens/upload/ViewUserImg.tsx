import React, { Component } from "react";
import {View,Image, Dimensions, Text} from 'react-native'
import { connect } from "react-redux";
import { getUser, followUser, unFollowUser } from '../../../actions/user'
import {getPost} from '../../../actions/post'
import { bindActionCreators } from "redux";
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class viewUserImg extends Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Image source={{uri:this.props.user?.photo}} style={{width:'90%',height:'90%', borderRadius:45,margin:10}}/>

            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser,followUser, unFollowUser,getPost }, dispatch)
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        profile: state.profile
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(viewUserImg)
