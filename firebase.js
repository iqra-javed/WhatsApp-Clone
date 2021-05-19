import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4woBK3-aTLbJv5ZuVsajBJ4pnHQ_ez6s',
  authDomain: 'whatsapp-clone-733e1.firebaseapp.com',
  projectId: 'whatsapp-clone-733e1',
  storageBucket: 'whatsapp-clone-733e1.appspot.com',
  messagingSenderId: '816092712843',
  appId: '1:816092712843:web:e75e4b2ee051e32c78298e',
  measurementId: 'G-FWPMZK0KH0',
};

// Use ternary to prevent initializing the app more than once since we are using SSR
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
