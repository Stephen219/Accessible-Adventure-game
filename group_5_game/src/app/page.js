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



