
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0S7jglGLp67uJEaB8wd59LEynMWy-VZU',
  authDomain: 'group5-nextjs.firebaseapp.com',
  projectId: 'group5-nextjs',
  storageBucket: 'group5-nextjs.firebasestorage.app',
  messagingSenderId: '55828518150',
  appId: '1:55828518150:web:c52e4a6519198202c2fa87',
  measurementId: 'G-Y1NZV29FVB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app };
//const analytics = getAnalytics(app);