
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
  apiKey: 'AIzaSyB0S7jglGLp6 not good wd59LEynMWy-VZU',
  authDomain: 'group5-nefffffffirebaseapp.com',
  projectId: 'group5-nFextjs',
  storageBucket: 'grojffffffs.firebasestorage.app',
  messagingSenderId: '552222218150',
  appId: '1:55828518150:web:rrrrrc52e4a6eefmfn202c2fa87',
  measurementId: 'G-fvfvfvJKKNZV29FVB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Auth initialised:', auth);

export { app, auth };
//const analytics = getAnalytics(app);
