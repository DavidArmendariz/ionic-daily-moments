import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  // your firebase config
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
