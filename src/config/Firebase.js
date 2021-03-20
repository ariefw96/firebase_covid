var firebase = require('firebase')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAs4qNzqVq2Ef70SyBGH_7UuEcyojtzrL0",
    authDomain: "covid19-25932.firebaseapp.com",
    databaseURL: "https://covid19-25932-default-rtdb.firebaseio.com",
    projectId: "covid19-25932",
    storageBucket: "covid19-25932.appspot.com",
    messagingSenderId: "687201391544",
    appId: "1:687201391544:web:7fcb6a2621a4272e49754d",
    measurementId: "G-GNTKQB4YLK"
  };

var fire = firebase.initializeApp(firebaseConfig);
module.exports = fire