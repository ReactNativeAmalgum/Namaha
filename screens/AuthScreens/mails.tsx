import React, { Component } from 'react';
import * as firebase from 'firebase'
import db from '../../config/Firebase';
import { getUser } from '../../actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const functions = require('firebase-functions');
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
admin.initializeApp()

// google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'namahaorg@gmail.com',
        pass: 'Namahaorg1234'
    }
});

class SendMail extends Component {

    componentDidMount = () =>{
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
              functions.firestore
              .document('orders/{orderId}')
              .onCreate((snap, context) => {
          
                firebase.auth().currentUser.sendEmailVerification()
            });
        }
        else{
         return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
        }
      })
    }
    render() {
      return (
  
      );
    }
  }
  const mapDispatchToProps = (dispatch) =>{
      return bindActionCreators({getUser }, dispatch)
  }
  
  const MapStateToProps =(state) =>{
      return {user: state.user}
  }
  export default connect(MapStateToProps, mapDispatchToProps)(SendMail)
  
function mailOptions(mailOptions: any, arg1: (error: any, data: any) => void) {
    throw new Error('Function not implemented.');
}

