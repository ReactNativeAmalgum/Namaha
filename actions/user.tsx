
import * as firebase from 'firebase';
import db from '../config/Firebase'
import "firebase/auth";
import {bind, orderBy} from 'lodash';
import * as Google from 'expo-google-app-auth';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { useState } from 'react';


export const updateEmail = (input) =>{
    return {type: 'UPDATE_EMAIL', payload:input} 
}
export const updateComment = (input) =>{
    return {type: 'UPDATE_COMMENT', payload:input} 
}
export const updatePassword = (input) =>{
    return {type: 'UPDATE_PASSWORD', payload:input} 
}
export const updateUsername = (input) =>{
    return {type: 'UPDATE_USERNAME', payload:input} 
}

export const updatePhoto = (input) => {
	return {type:'UPDATE_PHOTO', payload: input}
}
export const updateQuote = (input) => {
	return {type: 'UPDATE_QUOTE', payload: input}
}
export const updateName = (name) => {
	return {type: 'UPDATE_NAME', payload: name}
}
export const fetchUsers =()=>{
    return {type:"USER_STATE_CHANGE",payload:input}
}

export const USERS_LIKES_STATE_CHANGE = 'USERS_LIKES_STATE_CHANGE'

export const USERS_DATA_STATE_CHANGE ='USERS_DATA_STATE_CHANGE'

export const USER_CHATS_STATE_CHANGE ="USER_CHATS_STATE_CHANGE"


const  unsubscribe: string | any[] = [];




// creating users fields in descending order
// here user is variable that stores the property of users
export const signup = () =>{
    return async (dispatch, getState) =>{
    try{
        const {username, email, password, photo} = getState().user
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)

        const sendVerification = firebase.auth().currentUser.sendEmailVerification()
        if (response.user.uid){
            const user ={
                uid: response.user.uid,
                username:username,
                email:email, 
                posts:[],
                bio:"",
                likes:0,
                photo:photo,
                savePosts:[],
                followers:[],
                following:[]
            }
            await db.collection('users')
            .doc(response.user.uid)
            .set(user)
            dispatch({type:"LOGIN",payload: user})
            alert("You are signed in!")
            return sendVerification
            
        }

    }
    
    catch(e){
            alert(e)
        }
    }
}


// login function
export const login = () => {
    // dispatch is to going to be use to  change the whole app (general state)
    // getSTate is going to be for retriewing state
    return async (dispatch, getState) =>{
        try {
            const {email, password} = getState().user //get the data from users
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(getUser(response.user.uid))  //retrieve the unique id of user
        } catch (e) {
            alert(e)
        }

    }
}



export const getUser = (uid, type) =>{
    return async (dispatch, getState) =>{
        try{
            const userQuery = await db.collection('users').doc(uid).get()
            let user = userQuery.data()
            let posts = [] // create an empyt array of posts wehich are oin to be post object
            const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
            // above query which finds all the post created by the user 
            
            // and then all the post pushing them in the array of post
            postsQuery.forEach(function(response){
                posts.push(response.data())
    
            })        
            // order those post
            // user.posts = orderBy(posts,'date','desc')

            if (type == 'PROFILE'){
                dispatch({type:'GET_PROFILE', payload:user})
            }else{
                dispatch({type: 'LOGIN',payload:user})
            }

        }catch(e){
            alert(e),
            console.log(e)
        }
    }
}

export const followUser = (userToFollow,props,user) =>{
    return async (dispatch, getState) =>{
        try {
            const {uid} = getState().user

            await db.collection('users').doc(uid).update({
                following: firebase.firestore.FieldValue.arrayUnion(userToFollow)
            })
            
            await db.collection('users').doc(userToFollow).update({
                followers: firebase.firestore.FieldValue.arrayUnion(uid)
    
            })

            dispatch(getUser(userToFollow,'PROFILE'))
            return sendNotification(user.notificationToken, "New Follower", `${props.currentUser.name} Started following you`, { type: 'profile', user: firebase.auth().currentUser.uid })
        } catch (error) {
            alert(error)
        }
    }

}
export const unFollowUser = (userToFollow) =>{
    return async (dispatch, getState) =>{
        try {
            const {uid} = getState().user

            await db.collection('users').doc(uid).update({
                following: firebase.firestore.FieldValue.arrayRemove(userToFollow)
            })
            
            await db.collection('users').doc(userToFollow).update({
                followers: firebase.firestore.FieldValue.arrayRemove(uid)
    
            })

            dispatch(getUser(userToFollow,'PROFILE'))
        } catch (error) {
            alert(error)
        }

    }
}

export const updateUser = () =>{
    return async ( dispatch, getState ) =>{
        const {uid, username, quote, photo, backgroundImage} = getState().user
        try {
            db.collection('users').doc(uid).update({
                username: username,
                quote: quote,
                photo: photo
            })
        } catch (error) {
            alert(error)
        }
    }
}
export function queryUsersByUsername(username) {
    return ((dispatch, getState) => {
       try {
        return new Promise((resolve, reject) => {
            if (username.length == 0) {
                resolve([])
            }
            firebase.firestore()
                .collection('users')
                .where('username', '>=', username)
                .limit(10)
                .get()
                .then((snapshot) => {
                    let users = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    resolve(users);
                })
        })
       } catch (error) {
           Alert.alert(error)
       }
    })
}


// comment
export function fetchUser() {
    return ((dispatch) => {
        let listener = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot, error) => {
                if (snapshot.exists) {
                    dispatch({ type: 'USER_STATE_CHANGE', currentUser: { uid: firebase.auth().currentUser.uid, ...snapshot.data() } })
                }
            })
        unsubscribe.push(listener)
    })
}

export const setNotificationService = () => async dispatch => {
    let token;
    if (Constants.isDevice) {
        const existingStatus = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus.status !== 'granted') {
            const status = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus.status !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync());
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    if (token != undefined) {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
                notificationToken: token.data,
            })
    }

}

export const sendNotification = (to, title, body, data) => dispatch => {
    if (to == null) {
        return;
    }

    let response = fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to,
            sound: 'default',
            title,
            body,
            data
        })
    })

}
export function fetchUserChats() {
    return ((dispatch) => {
        let listener = firebase.firestore()
            .collection("chats")
            .where("users", "array-contains", firebase.auth().currentUser.uid)
            .orderBy("lastMessageTimestamp", "desc")
            .onSnapshot((snapshot) => {
                let chats = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })

                for (let i = 0; i < chats.length; i++) {
                    let otherUserId;
                    if (chats[i].users[0] == firebase.auth().currentUser.uid) {
                        otherUserId = chats[i].users[1];
                    } else {
                        otherUserId = chats[i].users[0];
                    }
                    dispatch(fetchUsersData(otherUserId, false))
                }

                dispatch({ type: USER_CHATS_STATE_CHANGE, chats })
            })
        unsubscribe.push(listener)
    })
}

export function fetchUsersData(uid, getPosts) {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;

                        dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                    }
                })
            if (getPosts) {
                dispatch(fetchUsersFollowingPosts(uid));
            }
        }
    })
}



export function fetchUsersFollowingLikes(uid, postId) {
    return ((dispatch, getState) => {
        let listener = firebase.firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                const postId = snapshot.id;

                let currentUserLike = false;
                if (snapshot.exists) {
                    currentUserLike = true;
                }

                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
            })
        unsubscribe.push(listener)
    })
}
