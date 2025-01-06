

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/app/auth/login/page';
import { loginWithEmail } from '@/utils/authService';


import '@testing-library/jest-dom'; 

jest.mock('@/utils/authService', () => ({
  loginWithEmail: jest.fn(),
}));

describe('Login Component', () => {
  beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
  });

  afterAll(() => {
    // Clean up after the tests
    delete window.location;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls loginWithEmail with email and password on form submission', async () => {
    loginWithEmail.mockResolvedValueOnce();

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(window.location.href).toBe('/game');
    });
  });

    test('renders the login form', () => {
    render(<Login />);
  
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    
  
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    
    
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });




  it('displays a generic error message for unexpected errors', async () => {
    loginWithEmail.mockRejectedValueOnce(new Error('Unexpected error occurred'));
  
    render(<Login />);
  
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
    });
  });




  test('shows error message for incorrect credentials', async () => {
    loginWithEmail.mockRejectedValueOnce(new Error('Firebase: Error (auth/invalid-credential).'));  // Mock incorrect password
    
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
    });
  });


  test('shows user not found error message', async () => {
    loginWithEmail.mockRejectedValueOnce(new Error('Firebase: Error (auth/user-not-found).'));  // Mock user not found
    
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'nonexistent@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    await waitFor(() => {
      expect(screen.getByText('User not found. Please sign up.')).toBeInTheDocument();
    });
  });
  



  
  



    

  






});
