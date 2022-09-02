import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyC57t1MkczcANrraGmRJky-okXrhUZgfZo",
  authDomain: "negociaciones-2022-4e2e3.firebaseapp.com",
  projectId: "negociaciones-2022-4e2e3",
  storageBucket: "negociaciones-2022-4e2e3.appspot.com",
  messagingSenderId: "786406833861",
  appId: "1:786406833861:web:3d1e5954c79e982521baac"
};

firebase.initializeApp(config);

export default firebase.database();