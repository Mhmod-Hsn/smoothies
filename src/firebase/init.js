import firebase from '@firebase/app';
import '@firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCUorBtVV80PCynd5rlLPvoriz3tdWv9rw",
  authDomain: "smoothies-ba8e0.firebaseapp.com",
  databaseURL: "https://smoothies-ba8e0.firebaseio.com",
  projectId: "smoothies-ba8e0",
  storageBucket: "smoothies-ba8e0.appspot.com",
  messagingSenderId: "995205409290",
  appId: "1:995205409290:web:cd31954f5d136406420df3",
  measurementId: "G-YVFVGZ1BBJ"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore()