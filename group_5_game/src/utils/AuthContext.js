
// 'use client';

// import React, { createContext, useContext } from 'react';
// import useAuth from './useAuth';
// import { useAuthContext } from '@/utils/AuthContext'; 

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const auth = useAuth();
//     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export const useAuthContext = () => useContext(AuthContext);


'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { initializeUserDocument } from "./userService";

// Create an AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Ensure the user document exists in Firestore
        await initializeUserDocument(user.uid);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Alias for backward compatibility
export const useAuthContext = useAuth; // Add this line for compatibility


