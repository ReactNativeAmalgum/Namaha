import React, { Component } from 'react';
import { Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser,} from '../../../actions/user';
import { likePost, unLikePost, savePost, unSavePost, getPosts, getSavedPosts } from '../../../actions/post';
import PostComponent from '../../Components/PostComponent';

// import { styles } from '../../assets/helps/styles/style';
// for all type screen window

// 
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class SavedPosts extends Component {

  componentDidMount = () =>{
    // its sees the component is first itme rendered
    this.props.getSavedPosts()
  }
  render() {
    return (



        <FlatList
                // style={{marginTop:20}}
                data={this.props.post.saved_feed}
                keyExtractor={(item) => JSON.stringify(item.uid)}
                renderItem={({item}) => (
                  <PostComponent 
                  item={item}
                  user={this.props.user}
                  likePost={(item) => this.props.likePost(item)}
                  unLikePost={(item) => this.props.unLikePost(item)}
                  savePost={(item) => this.props.savePost(item)}
                  unSavePost={(item) => this.props.unSavePost(item)}
                  />
                )}
        />



    );
  }
}
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({ getUser, getPosts, likePost,unLikePost,  savePost, unSavePost, getSavedPosts }, dispatch)
}

const MapStateToProps =(state) =>{
    return {
      user: state.user,
      post: state.post
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(SavedPosts)


