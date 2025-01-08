import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firestore';
/**
 * Fetches the game statistics for a user.
 * 
 * This function retrieves the game statistics from Firestore based on the userId.
 * If the user doesn't have statistics saved, it returns default values.
 * 
 * @param {string} userId - The unique ID of the user whose game statistics are being fetched.
 * 
 * @returns {Object} - Returns an object containing the user's game statistics:
 *    - `highScore`: The highest score the user has achieved.
 *    - `totalGamesPlayed`: The total number of games the user has played.
 *    - `totalTimePlayed`: The total time the user has spent playing.
 *    - `coins`: The total number of coins the user has accumulated.
 * 
 *    Returns default values (0 for all fields) if no statistics exist for the user.
 *    Returns `null` if an error occurs while fetching the data.
 */


export const fetchGameStatistics = async (userId) => {
    if (!userId) {
        console.log('No userId provided');
        return {
            highScore: 0,
            totalGamesPlayed: 0,
            totalTimePlayed: 0,
            coins: 0,
        };
    }

    try {
        const statsRef = doc(db, `gameStatistics/${userId}`);
        const docSnap = await getDoc(statsRef);
        
        if (docSnap.exists()) {
            return docSnap.data();
        }
        
        return {
            highScore: 0,
            totalGamesPlayed: 0,
            totalTimePlayed: 0,
            coins: 0,
        };
    } catch (error) {
        console.error(`Error fetching game statistics:`, error);
        return null;
    }
};

/**
 * Saves or updates the game statistics for a user.
 * 
 * This function saves the provided statistics for the specified userId in Firestore.
 * It will update the existing statistics if the user already has data stored.
 * 
 * @param {string} userId - The unique ID of the user whose game statistics are being saved.
 * @param {Object} stats - The game statistics to be saved, which must be an object.
 *    - `highScore`: The highest score the user has achieved.
 *    - `totalGamesPlayed`: The total number of games the user has played.
 *    - `totalTimePlayed`: The total time the user has spent playing.
 *    - `coins`: The total number of coins the user has accumulated.
 * 
 * @throws {Error} Throws an error if there is an issue while saving the statistics.
 * 
 * @returns {void}
 */

export const saveGameStatistics = async (userId, stats) => {
    if (!userId) {
        console.error('No userId provided');
        return;
    }
    
    if (!stats || typeof stats !== 'object') {
        console.error('Invalid stats object');
        return;
    }

    try {
        const statsRef = doc(db, `gameStatistics/${userId}`);
        await setDoc(statsRef, stats, { merge: true });
    } catch (error) {
        console.error('Error saving game statistics:', error);
        throw error; // Propagate error for handling
    }
};
