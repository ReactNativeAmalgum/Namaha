import { StyleSheet,Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: 'white',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    logon:{
        fontSize:30,
        fontWeight:'bold',
        fontFamily:'logofont',
        marginVertical:40,
    },
    txtInput:{
        height:50,
        width:screenHeight*0.9,
        // backgroundColor:'black',
        padding:10,
        color:'black',
        margin:0,
        borderRadius:10,
        borderColor:'gray',
        paddingHorizontal:20,
        borderWidth:1,

    },
    viewStyle:{
        width:screenHeight*0.9,
        // height:15,
        marginTop:10,
        // marginBottom:0,
    },
    txt:{
        left:15
    },
    butto:{
        width: screenHeight*0.6,
        height: 50,
        borderRadius:30,
        color:'white',
        backgroundColor:'#0005fe',
        justifyContent:'center',
        alignItems:'center',
        margin:30
    },
    btntxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
        justifyContent:'center',


    },
    img:{
        // justifyContent:'center',
        // alignItems:'center',
        position: 'absolute',
        zIndex:-1,
        width: screenWidth-1,
        height:screenHeight+80,
        justifyContent:'center',
        flex:1

    }
  });
  