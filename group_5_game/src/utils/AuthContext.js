
'use client';

import React, { createContext, useContext } from 'react';
import useAuth from './useAuth';

const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication state to the rest of the application.
 * 
 * This component wraps the application (or specific parts of the application) and provides
 * the authentication state via the Context API. It uses the `useAuth` custom hook to 
 * retrieve the current authentication state and then makes it available to all child 
 * components through the `AuthContext`.
 * 
 * @param {Object} props - The props passed to the component.
 * @param {ReactNode} props.children - The child components that can access the authentication state.
 * 
 * @returns {ReactNode} - The children wrapped in the `AuthContext.Provider` with authentication data.
 */
export const AuthProvider = ({ children }) => {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
