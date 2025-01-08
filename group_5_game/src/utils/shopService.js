import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

// Firestore reference
const db = getFirestore();

/**
 * Fetch all shop items from Firestore
 * @returns {Promise<Array>} - A list of shop items
 */
export async function getShopItems() {
  try {
    const shopCollectionRef = collection(db, "shop");
    const snapshot = await getDocs(shopCollectionRef);

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return items;
  } catch (error) {
    console.error("Error fetching shop items:", error);
    return [];
  }
}

/**
 * Initialize shop items in Firestore if they don't exist
 */
export async function initializeShopItems() {
  try {
    const shopCollectionRef = collection(db, "shop");
    const snapshot = await getDocs(shopCollectionRef);

    if (snapshot.empty) {
      console.log("Initializing default shop items...");

      const defaultItems = [
        { id: "stick", name: "Stick", price: 1 },
        { id: "rock", name: "Rock", price: 3 },
        { id: "gun", name: "Gun", price: 10 },
      ];

      for (const item of defaultItems) {
        const docRef = doc(shopCollectionRef, item.id);
        await setDoc(docRef, {
          name: item.name,
          price: item.price,
        });
      }

      console.log("Default shop items initialized.");
    } else {
      console.log("Shop items already exist.");
    }
  } catch (error) {
    console.error("Error initializing shop items:", error);
  }
}
