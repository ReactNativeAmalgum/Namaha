// import * as firebase from 'firebase';
// import "firebase/auth";
// require('firebase/firestore')

// const firebaseConfig = {
//   apiKey: "AIzaSyDiVHqN1aANgCYPW_kPUPnOzGBfb9omxSM",
//   authDomain: "hola-3535e.firebaseapp.com",
//   projectId: "hola-3535e",
//   storageBucket: "hola-3535e.appspot.com",
//   messagingSenderId: "973738656217",
//   appId: "1:973738656217:web:b608154ec5e1a0417059c8",
//   measurementId: "G-4TVRDVT3NS"
// };

//   // Initialize Firebase

// firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore()

// export default db;

import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDiVHqN1aANgCYPW_kPUPnOzGBfb9omxSM",
  authDomain: "hola-3535e.firebaseapp.com",
  projectId: "hola-3535e",
  storageBucket: "hola-3535e.appspot.com",
  messagingSenderId: "973738656217",
  appId: "1:973738656217:web:b608154ec5e1a0417059c8",
  measurementId: "G-4TVRDVT3NS"
};


firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export default db;
export const auth = firebase.auth()