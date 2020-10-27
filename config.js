import * as firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAs7yGzNF6tHeoLbdwISq5nL8q_wdv_FGQ",
  authDomain: "c34-realtimedatabase-99c49.firebaseapp.com",
  databaseURL: "https://c34-realtimedatabase-99c49.firebaseio.com",
  projectId: "c34-realtimedatabase-99c49",
  storageBucket: "c34-realtimedatabase-99c49.appspot.com",
  messagingSenderId: "255243765678",
  appId: "1:255243765678:web:7a9ccddca914663834ea3f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
