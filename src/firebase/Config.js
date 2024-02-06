import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBaHXHmhwmNyj5oj9XIdvWRu494WTcekgU",
  authDomain: "alpaago-cbe0d.firebaseapp.com",
  projectId: "alpaago-cbe0d",
  storageBucket: "alpaago-cbe0d.appspot.com",
  messagingSenderId: "267032835779",
  appId: "1:267032835779:web:d0167b7bf251fa8caad476",
  measurementId: "G-3VE9VMMSGE"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
