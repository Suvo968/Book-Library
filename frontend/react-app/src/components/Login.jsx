import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import googleLogo from "../assets/google-logo.svg";
import { getDatabase, ref, get, set } from "firebase/database"; // Import Firebase Realtime Database
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Google Auth
import {  signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const { login, loginwithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // For password visibility toggle
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    // Google OAuth handler
    const handleGoogleLogin = async () => {
        const auth = getAuth(); // Initialize Firebase Auth
        const provider = new GoogleAuthProvider(); // Google provider

        try {
            const result = await signInWithPopup(auth, provider); // Google OAuth Sign-in
            const user = result.user;
            
            // Store user data in Firebase Realtime Database
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.email.replace('.', '_')); // Replace '.' with '_' in email
            set(userRef, {
                email: user.email,
                username: user.displayName, // User's name from Google
                photoURL: user.photoURL, // User's photo from Google
            });

            // After successful login and storing user data, navigate to the dashboard with a welcome message
            alert(`Welcome, ${user.displayName}!`);
            navigate('/admin/dashboard', { replace: true, state: { message: `Welcome, ${user.displayName}!` } });
        } catch (error) {
            setError("Error during Google sign-in: " + error.message);
        }
    };


// Handle regular email/password login

const handleLogin = (event) => {
  event.preventDefault();

  // Check if email or password fields are empty
  if (!email || !password) {
    setError("Fields are required. Please enter both email and password.");
    return;
  }

  const auth = getAuth(); // Initialize Firebase Auth

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful login
      const user = userCredential.user;

      // Assuming the user's additional data (like username) is stored in the Realtime Database
      const db = getDatabase();
      const emailsRef = ref(db, `emails/${email.replace('.', '_')}`);

      get(emailsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.username); // Set the username from Firebase
          alert(`Welcome, ${userData.username}!`);
          navigate('/admin/dashboard', { replace: true, state: { message: `Welcome, ${userData.username}!` } });
        } else {
          setError("User not found ");
        }
      }).catch((error) => {
        setError("Error fetching user data: " + error.message);
      });
    })
    .catch((error) => {
      // Handle login errors
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        setError("Incorrect email or password. Please try again.");
      } else if (errorCode === 'auth/user-not-found') {
        setError("User not found. Please sign up to proceed.");
        setTimeout(() => {
          navigate('/sign-up', { replace: true });
        }, 5000); // Redirect to sign-up after showing the message
      } else {
        setError("Error logging in: " + error.message);
      }
    });
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
          <h1 className="text-2xl font-semibold text-center mb-6">Login Form</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Login</button>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/sign-up" className="text-blue-600 underline">Sign Up</Link>
            </p>
          </form>
          <hr className="my-6" />
          <div className="flex items-center justify-center">
            <button onClick={handleGoogleLogin} className="flex items-center space-x-2 bg-white rounded-lg p-3 hover:bg-gray-100">
              <img src={googleLogo} alt="Google Logo" className="w-6 h-6" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
