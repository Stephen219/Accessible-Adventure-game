'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Firebase Auth initialization
import { initializeUserDocument } from './userService'; // Import user initialization function

// Create an AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Tracks the currently logged-in user
  const [loading, setLoading] = useState(true); // Tracks if the auth process is still loading

  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Initialize the user's Firestore document
        try {
          await initializeUserDocument(user.uid);
          console.log('User document initialized for:', user.uid);
        } catch (error) {
          console.error('Error initializing user document:', error);
        }

        setCurrentUser(user); // Set the user in state
      } else {
        setCurrentUser(null); // Clear the user if logged out
      }
      setLoading(false); // Loading is complete
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Alias for backward compatibility
export const useAuthContext = useAuth;



