import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "@/app/auth/register/page";
import { signUpWithEmail } from "@/utils/authService";
import { useGoogleSignIn } from "@/utils/authService";
import "@testing-library/jest-dom";

jest.mock("@/utils/authService", () => ({
  signUpWithEmail: jest.fn(),
  useGoogleSignIn: jest.fn(),
}));

/**
 * Mock the authService module to mock the signUpWithEmail function
 * and test the SignUp component.
 */

describe("SignUp Component", () => {
  beforeEach(() => {
    useGoogleSignIn.mockImplementation(() => ({
      handleGoogleSignIn: jest.fn(),
    }));
  });

  beforeAll(() => {
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    delete window.location;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form correctly", () => {
    render(<SignUp />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password")).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  test("password validation and matching", async () => {
    render(<SignUp />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password124" },
    });
    await waitFor(() => {
      const errorMessage = screen.queryByText(/passwords do not match/i);
      expect(errorMessage).toBeInTheDocument();
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    await waitFor(() => {
      const errorMessage = screen.queryByText(/passwords do not match/i);
      expect(errorMessage).toBeNull();
    });
  });

  test("submitting the form", async () => {
    signUpWithEmail.mockResolvedValueOnce();

    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "longpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "longpassword" },
    });
    fireEvent.click(screen.getByTestId("sign-up-button"));
    await waitFor(() => {
      expect(signUpWithEmail).toHaveBeenCalledWith(
        "test@example.com",
        "longpassword"
      );
    });
    expect(window.location.href).toBe("/auth/login");
  });

  test("displays error for email already in use", async () => {
    signUpWithEmail.mockRejectedValueOnce({
      message: "Firebase: Error (auth/email-already-in-use).",
    });

    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "existinguser@example.com" },
    });
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(passwordInput, {
      target: { value: "longpassword" },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "longpassword" },
    });

    fireEvent.click(screen.getByTestId("sign-up-button"));

    await waitFor(() => {
      expect(
        screen.getByText(/email already in use. please sign in./i)
      ).toBeInTheDocument();
    });
  });

  test("calls handleGoogleSignIn on Google SignIn button click", () => {
    const handleGoogleSignIn = jest.fn();
    useGoogleSignIn.mockReturnValue({ handleGoogleSignIn });
    render(<SignUp />);
    fireEvent.click(screen.getByTestId("google-signin-button"));
    expect(handleGoogleSignIn).toHaveBeenCalled();
  });

  test("displays error for password mismatch and short password", () => {
    render(<SignUp />);
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    const signUpButton = screen.getByTestId("sign-up-button");
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "12345" } });
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument();
    expect(signUpButton).toBeDisabled();
    fireEvent.change(passwordInput, { target: { value: "longpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "longpassword" },
    });
    expect(signUpButton).toBeEnabled();
    expect(
      screen.queryByText(/Passwords do not match/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Password must be at least 6 characters/i)
    ).not.toBeInTheDocument();
  });
});
