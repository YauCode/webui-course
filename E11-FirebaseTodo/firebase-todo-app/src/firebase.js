import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjv8AfXvjGRhPw7k5xpIVCi-K0AV2K1Iw",
    authDomain: "todo-c3ddd.firebaseapp.com",
    projectId: "todo-c3ddd",
    storageBucket: "todo-c3ddd.appspot.com",
    messagingSenderId: "746317380465",
    appId: "1:746317380465:web:3cd70b45cdad8203cc14d0",
    measurementId: "G-9J945MN1FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;