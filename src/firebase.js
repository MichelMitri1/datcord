import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI23glnbDm1RYr9VFQAv6B48-V8k9SKjw",
  authDomain: "datcord-a8a37.firebaseapp.com",
  projectId: "datcord-a8a37",
  storageBucket: "datcord-a8a37.appspot.com",
  messagingSenderId: "144495714407",
  appId: "1:144495714407:web:c014e415beef23c86a74c2",
  measurementId: "G-XEDZ0ZFTJH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
