import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBvDY8OmP-1-i2kFlue1uDgAxSChzXevbc",
    authDomain: "project-live-7b8b7.firebaseapp.com",
    projectId: "project-live-7b8b7",
    storageBucket: "project-live-7b8b7.appspot.com",
    messagingSenderId: "223975911153",
    appId: "1:223975911153:web:7235684b33ada28cfe8350",
    measurementId: "G-TPQVBN3QQP"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const analytics = getAnalytics(app);

  export { auth }