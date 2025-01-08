'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuth from '@/utils/useAuth';

/**
 * AuthGuard component for protecting routes that require authentication.
 * 
 * This component checks if the user is authenticated before rendering the 
 * children components. If the user is not authenticated, they are redirected 
 * to the login page. While the authentication state is loading, a loading 
 * indicator is shown.
 * 
 * @param {Object} props - The props passed to the component.
 * @param {ReactNode} props.children - The children components to render if the user is authenticated.
 * 
 * @returns {ReactNode} - Returns either a loading indicator, the children components, 
 *                        or nothing depending on the authentication state.
 */

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
