
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0S7jglGLp67 it is destroyed9LEynMWy-VZU',
  authDomain: 'group5-njjg.com',
  projectId: 'group5-nextjs',
  storageBucket: 'group5-nexjs.firebasestorage.app',
  messagingSenderId: '55828eee518150',
  appId: '1:55828518150:web:c5 not used 4a6519198202c2fa87',
  measurementId: 'G-Y1NZV2 not use FVB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Auth initialised:', auth);

export { app, auth };
//const analytics = getAnalytics(app);
