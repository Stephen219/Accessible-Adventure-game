import { getFirestore, doc, getDoc, setDoc, collection, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

/**
 * Initialize a user's Firestore document if it doesn't exist
 * @param {string} userId - The unique ID of the logged-in user
 */
export async function initializeUserDocument(userId) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Create a new document with default values
      await setDoc(userDocRef, {
        coins: 0, // Default coin balance
        inventory: [], // Default empty inventory
      });
      console.log('User document created successfully.');
    } else {
      console.log('User document already exists.');
    }
  } catch (error) {
    console.error('Error initializing user document:', error);
  }
}

/**
 * Fetch the coin balance for a specific user
 * @param {string} userId - The unique ID of the logged-in user
 * @returns {Promise<number>} - The user's coin balance
 */
export async function getUserCoins(userId) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().coins || 0;
    } else {
      console.error('User document not found in Firestore.');
      return 0;
    }
  } catch (error) {
    console.error('Error fetching user coins:', error);
    return 0;
  }
}

/**
 * Update the coin balance for a specific user
 * @param {string} userId - The unique ID of the logged-in user
 * @param {number} newCoinBalance - The new coin balance
 */
export async function updateUserCoins(userId, newCoinBalance) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { coins: newCoinBalance });
    console.log('User coins updated successfully.');
  } catch (error) {
    console.error('Error updating user coins:', error);
  }
}

/**
 * Listen to real-time coin balance updates for a specific user
 * @param {string} userId - The unique ID of the logged-in user
 * @param {function} callback - A function to handle real-time coin updates
 */
export function listenToUserCoins(userId, callback) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', userId);
    return onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data().coins || 0);
      } else {
        console.error('User document not found in Firestore for real-time updates.');
        callback(0);
      }
    });
  } catch (error) {
    console.error('Error setting up real-time coin listener:', error);
  }
}








