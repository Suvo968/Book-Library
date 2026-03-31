import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import googleLogo from "../assets/google-logo.svg";
import { get, getDatabase, ref, set } from "firebase/database"; // Added 'get' import
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';  // Importing Firebase Authentication methods

const Signup = () => {
    const { createUser, loginwithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);  // State for password visibility toggle
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleSignUp = async (event) => {
      event.preventDefault();
      const form = event.target;
      const username = form.username.value.trim();
      const email = form.email.value.trim(); // Access the value property
      const password = form.password.value.trim(); // Access the value property
  
      setError("");
      setEmailError("");
      setPasswordError("");
      setSuccessMessage("");
  
      // Basic validation
      if (!username || !email || !password) {
          setError("Please fill in all the details.");
          return;
      }
  
      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailPattern.test(email)) {
          setEmailError("Please enter a valid email with @gmail.com domain.");
          return;
      }
  
      // Validate password strength
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordPattern.test(password)) {
          setPasswordError(
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          );
          return;
      }
  
      const db = getDatabase();
      const usernamesRef = ref(db, `usernames/${username}`);
      const emailsRef = ref(db, `emails/${email.replace(".", "_")}`);
  
      try {
          // Check if username already exists
          const usernameSnapshot = await get(usernamesRef);
          if (usernameSnapshot.exists()) {
              const existingUserEmail = usernameSnapshot.val().email;
              if (existingUserEmail === email) {
                  setError("User already exists with this username and email. Please login to proceed.");
              } else {
                  setError("Username is already taken. Please choose another.");
              }
              return;
          }
  
          // Check if email already exists
          const emailSnapshot = await get(emailsRef);
          if (emailSnapshot.exists()) {
              setError("Email is already registered. Please login to proceed.");
              return;
          }
  
          // Create user in Firebase Authentication
          const userCredential = await createUser(email, password);
          const user = userCredential.user;
  
          // Save user data to Firebase Realtime Database
          await set(usernamesRef, { email });
          await set(emailsRef, { username });
  
          // Show success message and redirect to login page
          setSuccessMessage("Sign up successful! Redirecting to login...");
          setTimeout(() => {
              navigate("/login", { replace: true });
          }, 3000);
      } catch (error) {
          setError("Failed to sign up: " + error.message);
      }
  };
  
    // Sign up using Google accounts
    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            // Sign in with Google OAuth popup
            const result = await signInWithPopup(auth, provider);

            // Google user information
            const user = result.user;
            const username = user.displayName; // Using display name from Google profile
            const email = user.email;

            // Check if the email exists in Firebase Realtime Database
            const db = getDatabase();
            const emailsRef = ref(db, `emails/${email.replace('.', '_')}`);
            const emailSnapshot = await get(emailsRef);

            if (emailSnapshot.exists()) {
                // If email exists, navigate directly to the dashboard with a welcome message
                navigate("/admin/dashboard", { state: { welcomeMessage: `Welcome, ${username}!` }, replace: true });
            } else {
                // If email does not exist, store the user data in Firebase Realtime Database
                const usernamesRef = ref(db, `usernames/${username}`);
                await set(usernamesRef, { email });

                await set(emailsRef, { username });

                // Redirect to the dashboard with the welcome message
                navigate("/admin/dashboard", { state: { welcomeMessage: `Welcome, ${username}!` }, replace: true });
            }
        } catch (error) {
            setError("Google login failed: " + error.message);
        }
    };


     // Define togglePasswordVisibility function
     const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6">Sign Up Form</h1>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
                  placeholder="example@gmail.com"
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
                  placeholder="Password"
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Sign Up</button>
              <p className="text-center mt-2">
                Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
              </p>
            </form>
            {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            <hr className="my-6" />
            <div className="flex items-center justify-center">
              <button onClick={handleGoogleLogin} className="flex items-center space-x-2 bg-white rounded-lg p-3 hover:bg-gray-100">
                <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
                <span>Sign up with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
