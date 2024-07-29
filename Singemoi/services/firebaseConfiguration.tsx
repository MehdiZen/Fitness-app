import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAsGdICnzigWYFOwcYBr-UGHhSjyakoXqU",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "catchme-cbff1",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "854204774531",
  appId: "YOUR_APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
