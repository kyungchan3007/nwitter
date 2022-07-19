import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALPPNyLcaBOZonX3addSW_r5NYjWK7zJ4",
  authDomain: "nwitter-19c19.firebaseapp.com",
  projectId: "nwitter-19c19",
  storageBucket: "nwitter-19c19.appspot.com",
  messagingSenderId: "69993318011",
  appId: "1:69993318011:web:80266ce345471d1e5804de",
};

export default firebase.initializeApp(firebaseConfig);
