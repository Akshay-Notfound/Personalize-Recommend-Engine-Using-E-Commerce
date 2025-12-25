import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Collection name
const USERS_COLLECTION = 'users';

/**
 * Create a new user profile in Firestore
 * @param {string} userId - The user's UID from Firebase Auth
 * @param {object} userData - User data to store
 */
export const createUserProfile = async (userId, userData) => {
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        await setDoc(userRef, {
            ...userData,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};

/**
 * Get user profile from Firestore
 * @param {string} userId - The user's UID
 * @returns {object|null} User profile data or null if not found
 */
export const getUserProfile = async (userId) => {
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

/**
 * Update user profile in Firestore
 * @param {string} userId - The user's UID
 * @param {object} updates - Fields to update
 */
export const updateUserProfile = async (userId, updates) => {
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

/**
 * Track user interaction (for recommendation engine)
 * @param {string} userId - The user's UID
 * @param {object} interaction - Interaction data (e.g., product view, purchase)
 */
export const trackUserInteraction = async (userId, interaction) => {
    try {
        const userProfile = await getUserProfile(userId);
        if (userProfile) {
            const interactions = userProfile.interactions || [];
            interactions.push({
                ...interaction,
                timestamp: new Date().toISOString()
            });

            await updateUserProfile(userId, { interactions });
        }
        return true;
    } catch (error) {
        console.error('Error tracking user interaction:', error);
        throw error;
    }
};
