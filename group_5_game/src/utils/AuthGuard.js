'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuth from '@/utils/useAuth';

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        alert('You need to login to access this page');
        
        router.push('/auth/login');
      } else {
        setIsAuthorized(true); 
      }
    }
  }, [user, loading, router]);

  if (loading || (!user && !isAuthorized)) {
    return <div>Loading...</div>;
  }

  return <>{isAuthorized && children}</>;
};

export default AuthGuard;
