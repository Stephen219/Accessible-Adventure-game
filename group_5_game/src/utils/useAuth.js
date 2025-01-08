'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';



/**
 * Custom hook for managing user authentication state.
 * 
 * This hook listens for changes in the authentication state and provides 
 * the current authenticated user along with the loading state while the 
 * authentication status is being determined.
 * 
 * @returns {Object} - Returns an object containing:
 *    - `user`: The currently authenticated user object if logged in, or `null` if not logged in.
 *    - `loading`: A boolean indicating if the authentication state is still being determined.
 *      - `true` while the authentication state is being checked.
 *      - `false` after the authentication state is determined.
 */

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
};

export default useAuth;
