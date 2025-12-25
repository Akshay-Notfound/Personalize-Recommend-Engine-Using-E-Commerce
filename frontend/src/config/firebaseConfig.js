// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAR4JBC93NovwWAIi9krMj9XlrLzzXbgDU",
    authDomain: "personalize-recommend-e-com.firebaseapp.com",
    databaseURL: "https://personalize-recommend-e-com-default-rtdb.firebaseio.com",
    projectId: "personalize-recommend-e-com",
    storageBucket: "personalize-recommend-e-com.firebasestorage.app",
    messagingSenderId: "869474746674",
    appId: "1:869474746674:web:32c6fd3559153e86f0572b",
    measurementId: "G-8EDW777DLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
