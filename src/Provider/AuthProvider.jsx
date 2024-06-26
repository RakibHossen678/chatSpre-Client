import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    const { data } = await axios("https://server-five-omega-98.vercel.app/logout", {
      withCredentials: true,
    });
    console.log(data);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const getToken = async (email) => {
    const { data } = await axios.post(
      "https://server-five-omega-98.vercel.app/jwt",
      { email },
      { withCredentials: true }
    );
    // console.log(data);
    return data;
  };

  // const saveUser = async (user) => {
  //   if ((user?.displayName && user?.photoURL)) {
  //     const loggedUser = {
  //       name: user?.displayName,
  //       email: user?.email,
  //       image: user?.photoURL,
  //       role: "user",
  //       badge: "bronze",
  //     };
  //     console.log(loggedUser);
  //     const { data } = await axios.post(
  //       "https://server-five-omega-98.vercel.app/users",
  //       loggedUser
  //     );
  //     return data;
  //   }
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);

      if (currentUser) {
        getToken(currentUser.email);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
