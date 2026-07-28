// ======================================
// Giraja Shankar Official
// Visitor Counter
// ======================================

import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

            const updated = await getDoc(counterRef);

            if (counterElement) {
                counterElement.textContent =
                    updated.data().totalVisitors;
            }

        }

    } catch (error) {

        console.error("Visitor Counter Error:", error);

    }

}

updateVisitorCounter();