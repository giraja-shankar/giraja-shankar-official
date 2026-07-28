// ======================================
// Giraja Shankar Official
// Newsletter Form (Firebase Firestore)
// ======================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

  newsletterForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = newsletterForm.querySelector('button[type="submit"]');

    const email = newsletterForm.querySelector('input[name="email"]').value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Subscribing...";

    try {

      await addDoc(collection(db, "newsletterSubscribers"), {

        email,
        subscribedAt: serverTimestamp()

      });

      alert("✅ Thank you for subscribing!");

      newsletterForm.reset();

    } catch (error) {

      console.error("Newsletter Error:", error);

      alert("❌ Subscription failed. Please try again.");

    } finally {

      submitBtn.disabled = false;
      submitBtn.innerHTML = "Subscribe";

    }

  });

} else {

  console.warn("Newsletter form not found.");

}
