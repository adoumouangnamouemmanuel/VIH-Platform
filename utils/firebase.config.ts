// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALpY56MtJKkjYG4wbzMT7kSO0yb4lNUOE",
  authDomain: "hiv-platform-e54e8.firebaseapp.com",
  projectId: "hiv-platform-e54e8",
  storageBucket: "hiv-platform-e54e8.firebasestorage.app",
  messagingSenderId: "1037118682430",
  appId: "1:1037118682430:web:27f9d7522504246e19686f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Enable Auth persistence
auth.useDeviceLanguage();

console.log("🔥 Firebase initialized successfully");
console.log("🔐 Auth domain:", firebaseConfig.authDomain);
console.log("📦 Project ID:", firebaseConfig.projectId);

export default app;
