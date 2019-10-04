import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const fireStore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const authPersistence = firebase.auth.Auth.Persistence;
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOutWithGoogle = () => auth.signOut();
export { fireStore, storage, auth, authPersistence, timestamp };

export default firebase;
