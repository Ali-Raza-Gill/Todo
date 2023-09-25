// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjj9Wm3wOP80ZvoxCE62vl4hlzYBx35Gs",
  authDomain: "todo-app-41ea3.firebaseapp.com",
  projectId: "todo-app-41ea3",
  storageBucket: "todo-app-41ea3.appspot.com",
  messagingSenderId: "148494439389",
  appId: "1:148494439389:web:75c75d99a0e36471245c34",
  measurementId: "G-M1BW0ZBZP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,analytics,db}