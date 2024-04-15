import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryUsersByUsername,getUser, followUser, unFollowUser} from '../../actions/user';
import { getPosts } from '../../actions/post';
import { container, text,utils } from '../../assets/helps/helpers/styles';
// import { utils } from '../../assets/helps/helpers/utils';


require('firebase/firestore');


function SearchScreen(props) {
    const [users, setUsers] = useState([])
    return (
        <SafeAreaView style={[utils.backgroundWhite ,container.container]}>
        <View style={{top:10}} >
            <View style={{ marginVertical: 30, paddingHorizontal: 20 }}>
                <TextInput
                    style={utils.searchBar}
                    placeholder="Type Here..."
                    onChangeText={(search) => props.queryUsersByUsername(search).then(setUsers)} />
            </View>


            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[container.horizontal, utils.padding10Sides, utils.padding10Top]}
                        onPress={() => props.navigation.navigate("ProfileScreen", { uid: item.id, username: undefined })}>

                        {item.image == 'default' ?
                            (
                                <FontAwesome5
                                    style={[utils.profileImage, utils.marginBottomSmall]}
                                    name="user-circle" size={50} color="black" />

                            )
                            :
                            (
                                <Image
                                    style={[utils.profileImage, utils.marginBottomSmall]}
                                    source={{
                                        uri: item.photo
                                    }}
                                />
                            )
                        }
                        <View style={utils.justifyCenter}>
                            <Text style={text.username}>{item.username}</Text>
                            <Text style={text.name} >{item.name}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    </SafeAreaView>
    )
}



const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({ getUser,queryUsersByUsername,getPosts }, dispatch)
}

const MapStateToProps =(state) =>{
  return {
    user: state.user,
    post: state.post
  }
}
export default connect(MapStateToProps, mapDispatchToProps)(SearchScreen)