import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {

    // PROVIDER
    const googleProvider = new GoogleAuthProvider();

    // STATES
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(false);
    const [loading, setLoading] = useState(true);

    // theme in the local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme === 'dark');
        }
    }, []);

    // toggle theme
    const toggleTheme = () => {
        setTheme((prevDark) => {
            const newTheme = !prevDark ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            return !prevDark;
        });
    };
    useEffect(() => {
        document.body.className = theme ? 'dark' : '';
    }, [theme]);

    // create a user with email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // Login User
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user profile
    const updateUserInfo = ({ displayName, photoURL }) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: displayName || auth.currentUser?.displayName,
            photoURL: photoURL || auth.currentUser?.photoURL
        });
    };

    // Google Login User
    const GoogleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // reset password
    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // Logout User
    const logout = () => {
        return signOut(auth);
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unsubscribe();
        }
    })

    // User Info
    const userInfo = {
        user,
        setUser,
        createUser,
        updateUserInfo,
        loginUser,
        GoogleLogin,
        resetPassword,
        loading,
        setLoading,
        theme,
        toggleTheme,
        logout
    };

    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>;
};
export default AuthProvider;