import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';  // Correct import for named export
import { 
  createUserWithEmailAndPassword,
  getAuth,  
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database"; // Import Firebase Realtime Database methods

const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        
        // Save user data to Firebase Realtime Database
        const db = getDatabase();
        const userRef = ref(db, 'users/' + newUser.email.replace('.', '_'));
        
        // Set the user details in the Realtime Database
        set(userRef, {
          email: newUser.email,
          displayName: newUser.displayName || 'No Name',
          googleSignIn: false, // This is a standard signup (not Google login)
          lastLogin: new Date().toISOString(),
        });
        return newUser;
      });
  };

  // Google login and store user data in Firebase
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const username = googleUser.displayName;
      const email = googleUser.email;

      const db = getDatabase();
      const usernamesRef = ref(db, `usernames/${username}`);
      const emailsRef = ref(db, `emails/${email.replace('.', '_')}`);

      // Check if the email exists already in the database
      const emailSnapshot = await get(emailsRef);
      if (emailSnapshot.exists()) {
        // If email exists, just return the user info
        setUser(googleUser);
        setLoading(false);
        return googleUser;
      } else {
        // If the email doesn't exist, create a new entry in the database
        await set(usernamesRef, { email });
        await set(emailsRef, { username });

        // After saving to the database, set the user and stop loading
        setUser(googleUser);
        setLoading(false);
        return googleUser;
      }
    } catch (error) {
      setLoading(false);
      console.error("Google login error:", error);
      throw error; // You can handle the error further up
    }
  };

  // Email/password login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedInUser = userCredential.user;

        // Ensure the user exists in the Firebase Realtime Database
        const db = getDatabase();
        const userRef = ref(db, 'users/' + loggedInUser.email.replace('.', '_'));

        return get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUser(loggedInUser);
              setLoading(false);
              return loggedInUser;
            } else {
              setLoading(false);
              throw new Error("User does not exist in the database");
            }
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching user data from Realtime Database:", error);
            throw error;
          });
      });
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUser(null);
      setLoading(false);
    });
  };

  // Observe authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    loginWithGoogle,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
