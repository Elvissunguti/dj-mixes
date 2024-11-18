
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlcn6ztLJplqb5sG-fyY97AiAMqmKzzn8",
  authDomain: "mixjam-30173.firebaseapp.com",
  projectId: "mixjam-30173",
  storageBucket: "mixjam-30173.appspot.com",
  messagingSenderId: "723728082988",
  appId: "1:723728082988:web:a648482ceed31c9c264989",
  measurementId: "G-4HV11QGBTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics };
