import React, { Component } from 'react'
import { View, Image, Dimensions, Text, ScrollView,TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import moment from 'moment'
// import Comments from './Comments'
import { uploadPost } from '../../actions/post'

const screenWidth = Dimensions.get("window").width

export default class PostComponent extends Component {
    static propTypes = {
        prop: PropTypes
    }
    state ={
        liked:undefined,
        numLike: 0, 
        saved:undefined

    }

    likePost = () => {
        if((this.props.item.likes.includes(this.props.user.uid)) || this.state.liked == true){
            if(this.state.liked == false){
                this.setState({liked:true})
                this.setState({numLike:this.state.numLike+1})//
                this.props.likePost(this.props.item)
                
            }
            else{
                this.setState({liked:false})
                this.setState({numLike:this.state.numLike-1})//
                this.props.unLikePost(this.props.item)
            }
        }
        else{
            this.setState({liked:true})
            this.props.likePost(this.props.item)
            this.setState({numLike:this.state.numLike+1})//

        }
        
    }

    savePost = () => {
        if((this.props.item.savedBy.includes(this.props.user.uid)) || this.state.saved == true){
            if(this.state.liked == false){
                this.setState({saved:true})
                this.props.savePost(this.props.item)
                
            }
            else{
                this.setState({saved:false})
                this.props.unSavePost(this.props.item)
            }
        }
        else{
            this.setState({saved:true})
            this.props.savePost(this.props.item)

        }
    }

    render() {
        return (
            <View style={{marginBottom:10}}> 
                <View style={{width:screenWidth, height:50, backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomColor:'grey', borderBottomWidth:0.07}}>
                    <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate('ProfileScreen', this.props.item.uid )}
                    style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
                        <Image source={{uri:this.props.item.photo}} style={{width:32,height:32, borderRadius:32/2, margin:15}}/>
                        <Text style={{fontWeight:'bold', fontSize:15, }}>{this.props.item.username}</Text>
                    </TouchableOpacity>
                    {/* <Text style={{margin:15}}>{moment(this.props.item.date).format('ll')}</Text> */}
                    <Image source={require('../../assets/images/3-dot.png')} style={{width:25,height:25, margin:10}} />

                </View>
                <View>
                    <ScrollView
                    horizontal={true}
                    pagingEnabled={true} 
                    >
                        {
                        this.props.item.photos?.map(e=>
                            <Image source={{uri: e}} style={{width:screenWidth, height:360, }} />
                        )
                        }
                    </ScrollView>
                </View>
                
                {/* This is our bottom bar */}
                <View style={{width:screenWidth, flexDirection:"row", justifyContent:"space-between", height:50, alignItems:'center'}}>
                    <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity 
                        onPress={()=>this.likePost()}>
                            {
                                (this.props.item.likes.includes(this.props.user.uid) && this.state.liked == undefined)?
                                <Image source={require('../../assets/images/emog-like.png')} style={{width:25,height:25, margin:10}} />
                                :
                                    (this.state.liked == true)?
                                    <Image source={require('../../assets/images/emog-like.png')} style={{width:25,height:25, margin:10}} />
                                    :
                                    <Image source={require('../../assets/images/dislike.png')} style={{width:25,height:25, margin:10}} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comments',{id:this.props.item.uid})}>
                            <Image source={require('../../assets/images/cmt.png')} style={{width:25,height:25, margin:10}} />
                        </TouchableOpacity>
                        <Image source={require('../../assets/images/sh.png')} style={{width:25,height:25, margin:10}} />
                    </View>
                    <TouchableOpacity
                    onPress={()=>this.savePost()}>
                        {
                            (this.props.item.savedBy.includes(this.props.user.uid) && this.state.saved == undefined)?
                            <Image source={require('../../assets/images/sv.png')} style={{width:25,height:25, margin:10}} />
                            :
                                (this.state.saved == true)?
                                <Image source={require('../../assets/images/sv.png')} style={{width:25,height:25, margin:10}} />
                                :
                                <Image source={require('../../assets/images/unsv.png')} style={{width:25,height:25, margin:10}} />

                        }
                    </TouchableOpacity>
                </View>
                
                <Text style={{fontWeight:'bold', marginHorizontal:10, marginTop:0 }}>{
                this.props.item.likes.length + this.state.numLike
                } likes</Text>
                
                <View style={{flexDirection:"row",  marginTop:5}}>
                    <Text style={{fontWeight:'bold', marginLeft:10}}>{this.props.item.username} </Text>
                    <Text>{this.props.item.description}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{marginHorizontal:10, color:"grey",  marginTop:5}}>Show all the comments: {this.props.item.comments.length}</Text>
                </TouchableOpacity>
                <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image 
                        source={{uri: this.props.user.photo}}
                        style={{width:32,height:32, borderRadius:32/2, marginHorizontal:10, marginTop:5}}/>
                        <TouchableOpacity>
                            <Text style={{ color:"grey",  marginTop:5}}>Add a comment...</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../assets/images/emojis.jpg')} style={{width:80, height:17, margin:10}}/>
                </View>
                <Text style={{marginHorizontal:10, color:"grey",  marginTop:5}}>{moment(this.props.item.date).format('ll')}</Text>
                
                

            </View>
        )
    }
}

