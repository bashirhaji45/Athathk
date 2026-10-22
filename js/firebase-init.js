
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwN4UZCZG1UjzTkBGp-fov6rzBLodwnMs",
  authDomain: "athathk-2c567.firebaseapp.com",
  projectId: "athathk-2c567",
  storageBucket: "athathk-2c567.firebasestorage.app",
  messagingSenderId: "383362239941",
  appId: "1:383362239941:web:ffe7a48407f3386682cfac",
  measurementId: "G-9RG2H48QFJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "ar";

export {
  app,
  auth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
};
