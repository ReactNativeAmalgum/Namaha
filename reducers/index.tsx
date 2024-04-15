import { combineReducers } from "redux";


const profile = (state = {}, action ) =>{
    switch (action.type){
        case 'GET_PROFILE':
            return action.payload
        default:
            return state
    }
}



// const sessionReducer = (state = initialState, action = {}) =>{
//     switch(action.type) {
//       case 'CREATE_SESSION': return { 
//         ...action.payload, 
//         authenticated: true,
//         // whatever props you need here...
//       };
  
//       case 'DESTROY_SESSION': return initialState;
  
//       default: return state;
//     }
//   }

// caaes are declared related to users info
const user = (state = {}, action: { type: any; payload: string; }) =>{
    switch (action.type){
        case 'LOGIN':
            return action.payload
        case 'UPDATE_EMAIL':
            return {...state, email:action.payload}
        case 'UPDATE_PASSWORD':
            return {...state, password:action.payload}
        case 'UPDATE_USERNAME':
            return {...state, username:action.payload.toLowerCase().replace(" ","_")}
        case 'UPDATE_PHOTO':
            return {...state, photo:action.payload}
        case 'UPDATE_QUOTE': 
            return { ...state, quote: action.payload }
        case 'RESET_PASSWORD':
            return {...state, resetpassword: action.payload}
        default: 
            return state
    }
}

// cases are declared related to users post
const post = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_POST_NEXT_PHOTO':
            return { ...state, photos: action.payload }
        case 'UPDATE_DESCRIPTION':
            return {...state, description:action.payload}
        case 'GET_COMMENT':
            return {...state,description:action.payload}
        case 'GET_POSTS':
            return { ...state, feed: action.payload}
        case 'GET_POST':
            return { ...state, onePost: action.payload}
        case 'GET_SAVED_POSTS':
            return {...state, saved_feed: action.payload}
        default:
            return state
    }
}


// this.props.post.photots then it eill return the action payload
const rootReducer =  combineReducers({
    user,
    post,
    profile
})
export default rootReducer