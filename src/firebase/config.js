import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWmQkEyLIHuz-BWevrpzPZ_FDGKzknj2g",
  authDomain: "mywholelife-c485e.firebaseapp.com",
  projectId: "mywholelife-c485e",
  storageBucket: "mywholelife-c485e.firebasestorage.app",
  messagingSenderId: "571255495701",
  appId: "1:571255495701:web:41d8b5bff33491db7d021c",
  measurementId: "G-44L31KHWEJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;