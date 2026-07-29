// ======================================
// Giraja Shankar Official
// Visitor Counter (Firebase Firestore)
// ======================================

import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const counterRef = doc(db, "websiteStats", "visitorCounter");
const counterElement = document.getElementById("visitorCount");

async function updateVisitorCounter() {

  try {

    const snapshot = await getDoc(counterRef);

    if (!snapshot.exists()) {

      await setDoc(counterRef, {
        totalVisitors: 1
      });

      if (counterElement) {
        counterElement.textContent = "1";
      }

    } else {

      await updateDoc(counterRef, {
        totalVisitors: increment(1)
      });

      const updatedSnapshot = await getDoc(counterRef);

      if (counterElement) {
        counterElement.textContent =
          updatedSnapshot.data().totalVisitors;
      }

    }

  } catch (error) {

    console.error("Visitor Counter Error:", error);

    if (counterElement) {
      counterElement.textContent = "Unavailable";
    }

  }

}

updateVisitorCounter();
