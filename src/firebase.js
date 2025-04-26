import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAzxryymJgmesm8S2JeSAJTCtDpOP40auw",
  authDomain: "todo-app-630eb.firebaseapp.com",
  projectId: "todo-app-630eb",
  storageBucket: "todo-app-630eb.firebasestorage.app",
  messagingSenderId: "496532998035",
  appId: "1:496532998035:web:9d41909cfee00c6dd3ca66",
  measurementId: "G-MZRPSEKEW7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);