'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // State Management
  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [displayedText, setDisplayedText] = useState(''); // For typing effect
const [cursorVisible, setCursorVisible] = useState(true); // For blinking cursor
  const fullText = 'Adventure Game'; // The full text to type out

// Typing effect
useEffect(() => {
  if (fullText) {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150); // Typing speed

    return () => clearInterval(typingInterval);
  }
}, [fullText]); // Ensure fullText is a dependency

// Blinking cursor effect
useEffect(() => {
  const cursorInterval = setInterval(() => {
    setCursorVisible((prev) => !prev);
  }, 500); // Blinking speed

  return () => clearInterval(cursorInterval);
}, []);

  // Guest Login Handler
  const handleGuestLogin = () => {
    router.push('/game');
  };

  // Create Account Handler
  const handleCreateAccount = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Mocked Logic for Testing
    console.log(`Mock account created for ${email}`);
    alert('Account created successfully! Please log in.');
    setCreateAccountModalOpen(false);
  };

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mocked Logic for Testing
    if (email === 'testuser@example.com' && password === 'testpassword') {
      alert('Login successful!');
      router.push('/game');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={containerStyle}>
    {/* Title with Typing Effect */}
    <div style={{ fontFamily: 'monospace', fontSize: '24px', marginBottom: '20px' }}>
      <span>{displayedText}</span>
      {cursorVisible && <span style={{ display: 'inline-block', width: '10px' }}>|</span>}
    </div>

      {/* Login Options */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleGuestLogin}>
          Login as Guest
        </button>
        <button style={buttonStyle} onClick={() => setLoginModalOpen(true)}>
          Login as User
        </button>
      </div>

      {/* Create Account Link */}
      <p
        style={linkStyle}
        onClick={() => setCreateAccountModalOpen(true)}
      >
        Create an Account
      </p>

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
            <button type="submit" style={modalButtonStyle}>
              Login
            </button>
          </form>
          <button style={closeButtonStyle} onClick={() => setLoginModalOpen(false)}>
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
            <button type="submit" style={modalButtonStyle}>
              Create Account
            </button>
          </form>
          <button style={closeButtonStyle} onClick={() => setCreateAccountModalOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  textAlign: 'center',
  marginTop: '50px',
};

const titleStyle = {
  fontSize: '2rem',
  color: '#fff',
  fontWeight: 'bold',
  display: 'inline-block',
  marginBottom: '30px',
};

const cursorStyle = {
  color: 'white',
  animation: 'blink 1s steps(2, start) infinite',
};

// Add CSS keyframes for blinking cursor
const blinkAnimation = `@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}`;

// Inject blinking cursor animation into a style tag
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = blinkAnimation;
  document.head.appendChild(style);
}

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '30px',
};

const buttonStyle = {
  padding: '20px',
  fontSize: '18px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const linkStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#007BFF',
  textDecoration: 'underline',
  cursor: 'pointer',
};

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
  color: '#000',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none', // Removes default blue outline
};

const inputFocusStyle = {
  ...inputStyle,
  border: '1px solid #4CAF50', // Highlights border in green when focused
};

const modalButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '10px',
};

const closeButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#FF4D4D',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '10px',
};

