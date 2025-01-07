import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firestore';




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
