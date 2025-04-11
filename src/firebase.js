

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGb8mCrEqjjA_-nsqdPicomMWtmuNAqck",
  authDomain: "blog-platform-94287.firebaseapp.com",
  projectId: "blog-platform-94287",
  storageBucket: "blog-platform-94287.firebasestorage.app",
  messagingSenderId: "313633407145",
  appId: "1:313633407145:web:f5cc8e1533f3c59d03a9b8"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
