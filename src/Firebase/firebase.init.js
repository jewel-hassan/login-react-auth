// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6ivoM63G_LAih9GS9abzmjRPy_TcHDcg",
  authDomain: "user-email-password-auth-574e3.firebaseapp.com",
  projectId: "user-email-password-auth-574e3",
  storageBucket: "user-email-password-auth-574e3.appspot.com",
  messagingSenderId: "942027830622",
  appId: "1:942027830622:web:88982e66eb5450c3ce8bcf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
