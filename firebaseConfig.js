import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD1v-9mpLHKSvKSRF8vPnAGy3zLlqMpdVk",
    authDomain: "local-metals-recyclers.firebaseapp.com",
    projectId: "local-metals-recyclers",
    storageBucket: "local-metals-recyclers.appspot.com",
    messagingSenderId: "345749774126",
    appId: "1:345749774126:web:368e62c80ae003b5a7e4bf",
    measurementId: "G-3ZPZ7FXJ3E"
  };
  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
export { storage };
