import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBkVW_j2DH23QJ9NyuezJ9NLislwCHSGFI",
  authDomain: "devtalk-d4ab2.firebaseapp.com",
  projectId: "devtalk-d4ab2",
  storageBucket: "devtalk-d4ab2.appspot.com",
  messagingSenderId: "103007098326",
  appId: "1:103007098326:web:44171f6c86408bbbbac077",
  measurementId: "G-RGBBBN32CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);