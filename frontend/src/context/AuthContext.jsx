import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { createUserProfile, getUserProfile } from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sign up with email and password
    const signup = async (email, password, displayName) => {
        try {
            setError(null);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user profile in Firestore
            await createUserProfile(user.uid, {
                email: user.email,
                displayName: displayName,
                createdAt: new Date().toISOString(),
                preferences: [],
                interactions: []
            });

            return user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Login with email and password
    const login = async (email, password) => {
        try {
            setError(null);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            setError(null);
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Check if user profile exists, if not create one
            const existingProfile = await getUserProfile(user.uid);
            if (!existingProfile) {
                await createUserProfile(user.uid, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                    preferences: [],
                    interactions: []
                });
            }

            return user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Logout
    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
            setUserProfile(null);
            // Clear localStorage for backward compatibility
            localStorage.removeItem('userId');
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                // Fetch user profile from Firestore
                const profile = await getUserProfile(user.uid);
                setUserProfile(profile);
                // Set backward compatibility with localStorage
                localStorage.setItem('userId', user.uid);
            } else {
                setUserProfile(null);
                localStorage.removeItem('userId');
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userProfile,
        loading,
        error,
        signup,
        login,
        logout,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
