'use client';
import React, { useState } from 'react'; // Added useState
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false); // Defined state

  const handleGuestLogin = () => {
    router.push('/game'); // Redirect to the filler page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to [App Name]</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
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
          }}
          onClick={handleGuestLogin} // Call the function to redirect
        >
          Login as Guest
        </button>

        {/* User Login Button */}
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

      {/* Create Account Button */}
      <div style={{ marginTop: '30px' }}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: '#4CAF50',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => setCreateAccountModalOpen(true)}
        >
          Create an Account
        </button>
      </div>

      {/* Create Account Modal */}
      {isCreateAccountModalOpen && (
        <div style={modalStyle}>
          <h2>Create Account</h2>
          <form>
            <input type="text" placeholder="Username" style={inputStyle} />
            <input type="email" placeholder="Email" style={inputStyle} />
            <input type="password" placeholder="Password" style={inputStyle} />
            <input type="password" placeholder="Confirm Password" style={inputStyle} />
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
