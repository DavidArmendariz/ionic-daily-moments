import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDn681kurHhJuPsR_nauoKbODKjWDeA5D8',
  authDomain: 'daily-moments-d3e5d.firebaseapp.com',
  databaseURL: 'https://daily-moments-d3e5d.firebaseio.com',
  projectId: 'daily-moments-d3e5d',
  storageBucket: 'daily-moments-d3e5d.appspot.com',
  messagingSenderId: '630456930591',
  appId: '1:630456930591:web:a0d39c5ee482342d0e202a',
};

const app = firebase.initializeApp(firebaseConfig);

