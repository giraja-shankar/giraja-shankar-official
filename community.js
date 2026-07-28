// ======================================
// Giraja Shankar Official
// Community Form (Firebase Firestore)
// ======================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const communityForm = document.getElementById("communityForm");

if (communityForm) {

  communityForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = communityForm.querySelector('button[type="submit"]');

    const name = document.getElementById("communityName").value.trim();
    const email = document.getElementById("communityEmail").value.trim();
    const message = document.getElementById("communityMessage").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Posting...";

    try {

      await addDoc(collection(db, "communityPosts"), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });

      alert("Community post submitted successfully.");

      communityForm.reset();

    } catch (error) {

      console.error(error);

      alert("Failed to submit community post.");

    } finally {

      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit";

    }

  });

}