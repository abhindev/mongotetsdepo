import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmXKRhiAn7234Yw4hC8ARHDDZwq8fhmIM",
  authDomain: "auth-1dff3.firebaseapp.com",
  projectId: "auth-1dff3",
  storageBucket: "auth-1dff3.appspot.com",
  messagingSenderId: "1096053049600",
  appId: "1:1096053049600:web:3115b4f0998ba042c80be5",
  measurementId: "G-G9Y9HCG48Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);