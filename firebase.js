/*=====================================================
   Giraja Shankar Official Website
   Firebase Configuration
======================================================*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/*=====================================================
                FIREBASE CONFIG
======================================================*/

const firebaseConfig = {

  apiKey: "AIzaSyC3Vofy4GQC7Jx4ZGDRkpdT7OAhsFm2EeE",

  authDomain: "giraja-shankar-official.firebaseapp.com",

  projectId: "giraja-shankar-official",

  storageBucket: "giraja-shankar-official.firebasestorage.app",

  messagingSenderId: "349657349598",

  appId: "1:349657349598:web:8d56ba1a4def0773bc314f",

  measurementId: "G-MMVTZJZ2FC"

};

/*=====================================================
            INITIALIZE FIREBASE
======================================================*/

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("✅ Firebase Connected Successfully");

/*=====================================================
                EXPORT DATABASE
======================================================*/

export { db };