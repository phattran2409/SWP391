// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbkSfhyRbOOBI3K90ACOshvNELrBh5lks",
  authDomain: "koi-fish-feng-shui.firebaseapp.com",
  projectId: "koi-fish-feng-shui",
  storageBucket: "koi-fish-feng-shui.appspot.com",
  messagingSenderId: "342171534722",
  appId: "1:342171534722:web:a11dcdfb14d36eb20b7b9b",
  measurementId: "G-S3YDM5CX1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { storage, googleProvider };
