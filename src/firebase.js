import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyARs17zOxVety8ulEFsqe_HOsxj98wFm24",
  authDomain: "todo-list-b3182.firebaseapp.com",
  projectId: "todo-list-b3182",
  storageBucket: "todo-list-b3182.appspot.com",
  messagingSenderId: "991722387492",
  appId: "1:991722387492:web:480df652476adfe2bc40b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db } ;