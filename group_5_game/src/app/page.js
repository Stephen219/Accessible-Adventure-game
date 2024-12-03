'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGuestLogin = () => {
    router.push('/game'); // Redirect to the filler page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to [App Name]</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button
          style={{
            padding: '20px',
            fontSize: '18px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleGuestLogin} // Call the function to redirect
        >
          Login as Guest
        </button>
        <button
          style={{
            padding: '20px',
            fontSize: '18px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Login as User functionality not implemented yet!')}
        >
          Login as User
        </button>
      </div>
    </div>
  );
}
