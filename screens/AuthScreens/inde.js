const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs=require('fs'); 
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = "sendermail@gmail.com";
const gmailPassword = "password";
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'namahaorg@gmailEmail.com',
    pass: 'Namaha1234',
  },
});

var htmlmail=fs.readFileSync("welcome.html","utf-8").toString();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const recipent_email = user.email; 
   
    const mailOptions = {
        from: '"Namaha team" <namahaorg@gmail.com>',
        to: this.prosp.user.email,
        subject: 'Welcome to MY APP',
         html: htmlmail
    };
    
  try {
    mailTransport.sendMail(mailOptions);
    console.log('mail send');
    
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
return null; 
  });