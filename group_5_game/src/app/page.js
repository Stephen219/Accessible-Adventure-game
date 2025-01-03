'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../utils/firebaseConfig'; // Ensure the path is correct
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {
  const router = useRouter();

  // State Management
  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Guest Login Handler
  const handleGuestLogin = () => {
    router.push('/game'); // Redirect to game page
  };

  // Create Account Handler
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user);

      alert('Account created successfully! Please log in.');
      setCreateAccountModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error creating account:', error.message);
      setError(error.message || 'Failed to create account. Please try again.');
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);

      alert(`Welcome back, ${user.email}!`);
      router.push('/game'); // Redirect to game page
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message || 'Invalid email or password.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to [App Name]</h1>

      {/* Guest Login Button */}
      <button
        style={{
          padding: '20px',
          fontSize: '18px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={handleGuestLogin}
      >
        Login as Guest
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        {/* Login Button */}
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
          onClick={() => setLoginModalOpen(true)}
        >
          Login as User
        </button>

        {/* Create Account Button */}
        <button
          style={{
            padding: '20px',
            fontSize: '18px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => setCreateAccountModalOpen(true)}
        >
          Create an Account
        </button>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div style={modalStyle}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Login
            </button>
          </form>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#FF4D4D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={() => setLoginModalOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Create Account Modal */}
      {isCreateAccountModalOpen && (
        <div style={modalStyle}>
          <h2>Create Account</h2>
          <form onSubmit={handleCreateAccount}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              style={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Create Account
            </button>
          </form>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#FF4D4D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={() => setCreateAccountModalOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

// Modal Styles
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
  zIndex: 1000,
  textAlign: 'center',
  borderRadius: '8px',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  margin: '10px 0',
  padding: '10px',
  fontSize: '16px',
};
