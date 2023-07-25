import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCz2-J5hKxQWwwmVYpm3NFiOXqFIORn1gU",
  authDomain: "user-8341b.firebaseapp.com",
  projectId: "user-8341b",
  storageBucket: "user-8341b.appspot.com",
  messagingSenderId: "398726682492",
  appId: "1:398726682492:web:37188112face905ac076f9",
  measurementId: "G-7E2HXY1XM1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
