// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'SHOULD_BE_IN_DOTENVIRONMENT',
  authDomain: 'SHOULD_BE_IN_DOTENVIRONMENT',
  projectId: 'SHOULD_BE_IN_DOTENVIRONMENT',
  storageBucket: 'SHOULD_BE_IN_DOTENVIRONMENT',
  messagingSenderId: 'SHOULD_BE_IN_DOTENVIRONMENT',
  appId: 'SHOULD_BE_IN_DOTENVIRONMENT',
};

const app = firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();

export default auth;
