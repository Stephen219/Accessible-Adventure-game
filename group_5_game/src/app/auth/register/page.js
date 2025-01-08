

'use client';

import { signUpWithEmail } from '@/utils/authService';
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Twitter } from 'lucide-react';
import { useGoogleSignIn } from '@/utils/authService';

const SignUp = () => {
  const { handleGoogleSignIn } = useGoogleSignIn();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(' ');

  const handlePasswordChange = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const match = password === confirmPassword;
    setPasswordMatch(match);
    const isValid = password.length >= 6;
    setIsPasswordValid(isValid);
    setIsButtonDisabled(!match || !isValid || !password || !confirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    

    try {
      await signUpWithEmail(email, password);
      window.location.href = '/auth/login';
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        setErrorMessage("Email already in use. Please sign in.");
      } else if (error.message === 'Firebase: Error (auth/weak-password).') {
        setErrorMessage("Password is too weak. Please try again.");} 
        else{
        setErrorMessage("An error occurred. Please try again.");}
    }
  };

  

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <form onSubmit={handleSignUp}>
        <Card className="w-[400px] max-w-[90%]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-center">Create Account</CardTitle>
            <span className="text-xs text-center text-gray-400">
              Already have an account? <a href="/auth/login" className="text-purple-500">Sign In</a>
            </span>
          </CardHeader>
            {errorMessage && (
                <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>)}
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                data-testid="password"
                ref={passwordRef}
                onChange={handlePasswordChange}
                className={`border ${passwordMatch ? 'border-gray-300' : 'border-red-500'}`}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                data-testid="confirm-password"
                ref={confirmPasswordRef}
                onChange={handlePasswordChange}
                className={`border ${passwordMatch ? 'border-gray-300' : 'border-red-500'}`}
              />
              {!passwordMatch && (
                <p className="text-red-500 text-xs">Passwords do not match</p>
              )}
                {!isPasswordValid && (
                    <p className="text-red-500 text-xs">Password must be at least 6 characters</p>
                )}
            </div>
            <Button className="w-full" disabled={isButtonDisabled} data-testid="sign-up-button">
              Sign Up
            </Button>
            
            <div
              className={`h-2 mt-4 rounded-full transition-colors duration-300 bg-slate-300 ${
                isPasswordValid && passwordMatch
                  ? 'bg-green-500'
                  : 'bg-red-700'
              }`}
            ></div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1a1a1a] px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" aria-label="Sign up with Google" data-testid="google-signin-button"
               size="sm" onClick={handleGoogleSignIn}>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </Button>
              <Button variant="outline" size="sm" type="submit">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                </svg>
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SignUp;
