/* eslint-disable quotes */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from "./firestore";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


/**
 *  This function creates a new user in the Firebase Authentication system
 * @param {*  email} email
 * } email 
 * @param {*} password 
 * @returns  user object
 */
export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Successfully signed up as ${user.email}`);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * This function logs in a user with an email and password
 * @param {*} email
 * @param {*} password
 * @returns user object
 */


export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Welcome back ${user.email}`);
        return user;
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw new Error(error.message);
        
    }
};



/**
 * This function logs in a user with Google OAuth
 * @returns user object
 */





export const useGoogleSignIn = () => {
    const router = useRouter();
  
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User details:', user);

        // Save user to Firestore
        // Save user to Firestore
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // If user doesn't exist in Firestore, create a new record
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,  // Consider storing the user's photo URL
          createdAt: new Date(),
        });
        console.log(`Created new user record for ${user.displayName}`);
      }

   
        alert(`Welcome ${user.displayName}!`);


        // // Check if user already exists in Firestore
        // const userDoc = doc(db, 'users', user.uid);
        // const docSnap = await getDoc(userDoc);
        // if (!docSnap.exists()) {
        //   // Create a new user document in Firestore
        //   await setDoc(userDoc, {
        //     email: user.email,
        //     name: user.displayName,
        //     photoURL: user.photoURL,
        //   });
        // }
        router.push('/game'); // Navigate to a different page
      } catch (error) {
        console.error('Error during Google Sign-In', error);
      }
    };
  
    return { handleGoogleSignIn };
  };