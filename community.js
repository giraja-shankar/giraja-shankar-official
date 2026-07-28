// ======================================
// Giraja Shankar Official
// Community Form (Firebase Firestore)
// ======================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const communityForm = document.getElementById("communityForm");

if (communityForm) {

  communityForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = communityForm.querySelector('button[type="submit"]');

    const name = communityForm.querySelector('input[name="name"]').value.trim();
    const email = communityForm.querySelector('input[name="email"]').value.trim();

    if (!name || !email) {
      alert("Please fill all fields.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Joining...";

    try {

      await addDoc(collection(db, "communityMembers"), {

        name,
        email,
        joinedAt: serverTimestamp()

      });

      alert("✅ Thank you for joining the community!");

      communityForm.reset();

    } catch (error) {

      console.error("Community Error:", error);

      alert("❌ Failed to join community.");

    } finally {

      submitBtn.disabled = false;
      submitBtn.innerHTML = "Join Community";

    }

  });

} else {

  console.warn("Community form not found.");

}
