'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/utils/useAuth';
import React from 'react';

const AuthGuard = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking auth
    }

    if (!user) {
        // Redirect to login if user is not authenticated
        router.push('/auth/login');
        return null; // Prevent rendering the page until redirection completes
    }

    // Allow rendering if the user is authenticated
    return <>{children}</>;
};

export default AuthGuard;
