import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3glKRGTwXmdG_UgCUmcHC1M--AcO0uaY",
    authDomain: "sakkokassakhk.firebaseapp.com",
    projectId: "sakkokassakhk",
    storageBucket: "sakkokassakhk.firebasestorage.app",
    messagingSenderId: "355346603040",
    appId: "1:355346603040:web:cf3bd7c9d23b63d50d7045"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
