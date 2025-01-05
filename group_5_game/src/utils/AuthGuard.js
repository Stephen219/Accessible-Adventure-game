'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/utils/useAuth';
import React from 'react';

const AuthGuard = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        
        router.push('/auth/login');
        return null; 
    }

    // Allow rendering if the user is authenticated
    return <>{children}</>;
};

export default AuthGuard;
