import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Fetch the coin balance for a specific user from Firestore
 * @param {string} userId - The unique ID of the logged-in user
 * @returns {Promise<number>} - The user's coin balance or 0 if not found
 */
export async function getUserCoins(userId) {
  try {
    const db = getFirestore(); // Initialize Firestore
    const userDocRef = doc(db, "users", userId); // Reference the user's document
    const userDoc = await getDoc(userDocRef); // Fetch the document

    if (userDoc.exists()) {
      return userDoc.data().coins || 0; // Return the coins or default to 0
    } else {
      console.error("User document not found in Firestore.");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching user coins:", error);
    return 0; // Return 0 in case of an error
  }
}

/**
 * Initialize a user's Firestore document if it doesn't exist
 * @param {string} userId - The unique ID of the logged-in user
 */
export async function initializeUserDocument(userId) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Create a new document with default values
      await setDoc(userDocRef, {
        coins: 0, // Default coin balance
        inventory: [], // Default empty inventory
      });
      console.log("User document created successfully.");
    } else {
      console.log("User document already exists.");
    }
  } catch (error) {
    console.error("Error initializing user document:", error);
  }
}
