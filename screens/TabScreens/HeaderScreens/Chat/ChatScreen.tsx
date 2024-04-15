// import React from 'react';
// import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, Image, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
// import { addMessage, getPosts } from '../../../../actions/post';
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getUser } from '../../../../actions/user';

// import { getPost } from '../../../../actions/post';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as firebase from 'firebase';
// const screenWidth = Dimensions.get("window").width
// const screenHeight = Dimensions.get("window").height
// const keyboardVerticalOffset = Platform.OS === 'ios'?120:100 


// class ChatScreen extends React.Component {
//     state={
//       messages:[],
//       message:''
//     }
//     constructor(props){
//       super(props);

//       this.subscriber = firebase.firestore() // subscriber is an listner, listen to the action of databae
//       .collection('messages')
//       .limit(50)
//       .orderBy('date','desc')
//       .onSnapshot(docs=>{
//         let messages = [] //creating array
//         docs.forEach(doc=>{  //creating doc for each user's message
//           messages.push(doc.data()) //// pushing data in doc
//         })
//         this.setState({messages})
//       })
//     }
//     sendMessage = () =>{
//       // so if it's not long then we gonna do stuffs or we left empty
//       if (this.state.message.replace(/\s/g,'').length){
//         this.props.addMessage(this.state.message)
//         this.setState({message:''})
//       }
//     }
//     renderItem({item}) {
//       if (item.username !== undefined) {
//           return (
//           <View style={styles.row}>
//               <Image style={styles.avatar} source={{uri: item.photo}} />            
//               <View style={styles.rowText}>
//                   <Text style={styles.sender}>{item.username}</Text>
//                   <Text style={styles.message}>{item.message}</Text>
//               </View>
//           </View>
//           );
//       }
//       return
//   }
//     render(){       
//     return (
//       <KeyboardAvoidingView style={{flex:1,backgroundColor:'white'}}
//       behavior={Platform.OS === "ios"? "padding":null} //if device is android it will add pading or else it is a android it will be null
//       keyboardVerticalOffset={keyboardVerticalOffset}
//       >
//         <FlatList 
//         inverted
//         keyExtractor={(item)=> JSON.stringify(item.date)}
//         data={this.state.messages}
//         style={{flex:1,}}
//         extraData={this.state}
//         renderItem={this.renderItem}
//         // renderItem={({item})=>(
//         //   <View><Text style={{color:'black'}}>{item.message}</Text></View>
//         // )} 
//         />
//         <View style={{width:'100%',flexDirection:'row',alignItems:'center',borderTopWidth:0.5,borderColor:'grey'}}>
//           <TextInput
//             style={{width:'85%',height:50,paddingVertical:10,paddingHorizontal:20,color:'black'}}
//             onChangeText={(message)=>this.setState({message})}
//             value={this.state.message}
//             returnKeyType='send'             //on enter another line to create it
//             placeholder='Send Message'
//             onSubmitEditing={this.sendMessage} //after u press enter send message
//             placeholderTextColor='grey'
//             autoCapitalize='none'
//           />
//           <TouchableOpacity onPress={() => this.sendMessage()}>
//             <Text style={[
//               (!this.state.message.replace(/\s/g,'').length)?
//               {
//                 color:'grey'
//               }
//                 :
//               {
//                   fontWeight:'bold',color:'black'
//               }
//             ]}>SEND</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'blue',
// },
// sender: {
//     fontWeight: 'bold',
//     paddingRight: 10,
// },
// avatar: {
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     marginRight: 20,
// },
// rowText: {
//     flex: 1,
// },
// row: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor:'pink',
//     flexDirection: 'row'
// },
// input: {
//     flex: 6,
//     padding: 2,
//     paddingTop: 5,
//     paddingBottom: 5,
//     backgroundColor: 'yellow',
//     color: 'black'
// },
// submit: {
//     flex: 2,
//     backgroundColor: 'green',
//     justifyContent: 'center',
// },
// submitText: {
//     alignSelf: 'center',
//     fontWeight: '600'
// },
// footer: {
//     flexDirection: 'row',
//     backgroundColor: 'orange',
// },
// })

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ getUser, getPosts, addMessage}, dispatch)
// }
// const mapStateToProps = (state) => {
//     return{
//         user: state.user,
//         post: state.post
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)







import { View, Text } from 'react-native'
import React from 'react'

export default function ChatScreen() {
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}