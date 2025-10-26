import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAY1Si-lv_EwvyXJ-CdX20x4ic-jwinjiY",
  authDomain: "benja-free-fire-cb7b8.firebaseapp.com",
  projectId: "benja-free-fire-cb7b8",
  storageBucket: "benja-free-fire-cb7b8.firebasestorage.app",
  messagingSenderId: "851302078937",
  appId: "1:851302078937:web:de1bbef2aa34a30a4ce1c8",
  measurementId: "G-J3H1B409T4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);