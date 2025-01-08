// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { signUpWithEmail, loginWithEmail } from '../utils/authService'; 
// import { useAuthContext } from '../utils/AuthContext'; 

// export default function Home() {
//   const router = useRouter();
//   const { user } = useAuthContext(); 

//   // State Management
//   const [isCreateAccountModalOpen, setCreateAccountModalOpen] = useState(false);
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const [displayedText, setDisplayedText] = useState(''); // For typing effect
//   const [cursorVisible, setCursorVisible] = useState(true); // For blinking cursor
//   const fullText = 'Adventure Game'; // The full text to type out

//   // // Typing effect for dynamically displaying the "Adventure Game" title
//   useEffect(() => {
//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       if (currentIndex < fullText.length) {
//         setDisplayedText(fullText.slice(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         clearInterval(typingInterval);
//       }
//     }, 150);

//     return () => clearInterval(typingInterval);
//   }, []);

//   // Blinking cursor effect
//   useEffect(() => {
//     const cursorInterval = setInterval(() => {
//       setCursorVisible((prev) => !prev);
//     }, 500);

//     return () => clearInterval(cursorInterval);
//   }, []);

//   // Guest Login Handler
//   const handleGuestLogin = () => {
//     router.push('/game'); // Redirect to the game page
//   };

//   // Create Account Handler using Firebase Authentication
//   const handleCreateAccount = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       const user = await signUpWithEmail(email, password); 
//       console.log('User created:', user);

//       // Optionally handle additional actions, like saving the username in Firestore
//       alert('Account created successfully! Please log in.');
//       setCreateAccountModalOpen(false); // Close the modal
//     } catch (error) {
//       console.error('Error creating account:', error.message);
//       setError(error.message || 'Failed to create account. Please try again.');
//     }
//   };

//   // Login Handler using Firebase Authentication
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const user = await loginWithEmail(email, password); 
//       console.log('Logged in user:', user);

//       alert(`Welcome back, ${user.email}!`);
//       router.push('/game'); // Redirect to the game page
//     } catch (error) {
//       console.error('Error logging in:', error.message);
//       setError(error.message || 'Invalid email or password.');
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Title with Typing Effect */}
//       <div style={{ fontFamily: 'monospace', fontSize: '24px', marginBottom: '20px' }}>
//         <span>{displayedText}</span>
//         {cursorVisible && <span style={{ display: 'inline-block', width: '10px' }}>|</span>}
//       </div>

//       {/* Login Options */}
//       <div style={buttonContainerStyle}>
//         <button style={buttonStyle} onClick={handleGuestLogin}>
//           Login as Guest
//         </button>
//         <button style={buttonStyle} onClick={() => setLoginModalOpen(true)}>
//           Login as User
//         </button>
//       </div>

//       {/* Create Account Link */}
//       <p style={linkStyle} onClick={() => setCreateAccountModalOpen(true)}>
//         Create an Account
//       </p>

//       {/* Login Modal */}
//       {isLoginModalOpen && (
//         <div style={modalStyle}>
//           <h2 style={{ color: '#000' }}>Login</h2>
//           <form onSubmit={handleLogin}>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <input
//               type="email"
//               placeholder="Email"
//               style={inputStyle}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               style={inputStyle}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit" style={modalButtonStyle}>
//               Login
//             </button>
//           </form>
//           <button style={closeButtonStyle} onClick={() => setLoginModalOpen(false)}>
//             Close
//           </button>
//         </div>
//       )}

//       {/* Create Account Modal */}
//       {isCreateAccountModalOpen && (
//         <div style={modalStyle}>
//           <h2 style={{ color: '#000' }}>Create Account</h2>
//           <form onSubmit={handleCreateAccount}>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <input
//               type="text"
//               placeholder="Username"
//               style={inputStyle}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               style={inputStyle}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               style={inputStyle}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               style={inputStyle}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <button type="submit" style={modalButtonStyle}>
//               Create Account
//             </button>
//           </form>
//           <button style={closeButtonStyle} onClick={() => setCreateAccountModalOpen(false)}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Styles
// const containerStyle = {
//   textAlign: 'center',
//   marginTop: '50px',
// };

// const buttonContainerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   gap: '20px',
//   marginTop: '30px',
// };

// const buttonStyle = {
//   padding: '20px',
//   fontSize: '18px',
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
// };

// const linkStyle = {
//   marginTop: '20px',
//   fontSize: '16px',
//   color: '#FFFFFF',
//   textDecoration: 'underline',
//   cursor: 'pointer',
// };

// const modalStyle = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   padding: '20px',
//   backgroundColor: 'white',
//   boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
//   zIndex: 1000,
//   textAlign: 'center',
//   borderRadius: '8px',
// };

// const inputStyle = {
//   display: 'block',
//   width: '100%',
//   margin: '10px 0',
//   padding: '10px',
//   fontSize: '16px',
//   color: '#000',
//   backgroundColor: '#fff',
//   border: '1px solid #ccc',
//   borderRadius: '4px',
//   outline: 'none',
// };

// const modalButtonStyle = {
//   padding: '10px 20px',
//   fontSize: '16px',
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   marginTop: '10px',
// };

// const closeButtonStyle = {
//   padding: '10px 20px',
//   fontSize: '16px',
//   backgroundColor: '#FF4D4D',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   marginTop: '10px',
// };

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../utils/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  const [displayedText, setDisplayedText] = useState(''); // For typing effect
  const [cursorVisible, setCursorVisible] = useState(true); // For blinking cursor
  const fullText = 'Adventure Game'; // The full text to type out

  // Typing effect for dynamically displaying the "Adventure Game" title
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Redirect to Login Page
  const handleLoginRedirect = () => {
    router.push('/auth/login'); // Redirect to login route
  };

  // Redirect to Registration Page
  const handleRegisterRedirect = () => {
    router.push('/auth/register'); // Redirect to register route
  };

  // Guest Login Handler
  const handleGuestLogin = () => {
    router.push('/game'); // Redirect to the game page
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="w-[400px] max-w-[90%] bg-[#1a1a1a] rounded-lg shadow-lg p-6 space-y-6">
        {/* Title with Typing Effect */}
        <h1 className="text-2xl font-semibold text-center text-white">
          {displayedText}
          {cursorVisible && <span className="text-purple-500">|</span>}
        </h1>

        {/* Login Options */}
        <div className="flex flex-col space-y-4">
          <button
            className="w-full py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
            onClick={handleGuestLogin}
          >
            Login as Guest
          </button>
          <button
            className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            onClick={handleLoginRedirect}
          >
            Login as User
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1a1a1a] px-2 text-gray-400">Or</span>
          </div>
        </div>

        {/* Create Account */}
        <button
          className="w-full py-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition"
          onClick={handleRegisterRedirect}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}



