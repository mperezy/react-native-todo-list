// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const appLength = firebase.apps.length;

// eslint-disable-next-line no-unused-vars
const app = appLength === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();
const database = firebase.firestore(app);

export const auth = firebase.auth();
export const taskCollection = database.collection('tasks');
