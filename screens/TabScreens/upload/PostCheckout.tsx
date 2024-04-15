import { Text, View, TextInput, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDescription } from '../../../actions/post';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class PostCheckout extends Component {
  render() {
    return (
      <View style={{flex:1,  alignItems:'center'}}>
         <TextInput 
            placeholder='Type in your description :)'
            placeholderTextColor={'black'}
            onChangeText={input=>this.props.updateDescription(input)}
            value={this.props.post.description}
            style={{fontSize:20,width:"95%",borderRadius:10,backgroundColor:'rgba(0,0,0,0.05)',margin:20, paddingVertical:5, paddingHorizontal:5}}
        />
        <View>
            <ScrollView horizontal={true} pagingEnabled={true}>    
                {
                    this.props.post.photos?.map(e => 
                    <Image source={{uri: e}} style={{width:screenWidth,height:360}}/>
            
                )}    
            </ScrollView>
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({ updateDescription }, dispatch)
}

const MapStateToProps =(state) =>{
    return {
      user: state.user,
      post: state.post
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(PostCheckout)
