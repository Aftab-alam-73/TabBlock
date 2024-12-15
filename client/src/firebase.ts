// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "o-e2049.firebaseapp.com",
  projectId: "o-e2049",
  storageBucket: "o-e2049.appspot.com",
  messagingSenderId: "358059857666",
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


