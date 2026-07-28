// ======================================
// Giraja Shankar Official
// Newsletter Form
// ======================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn = newsletterForm.querySelector('button[type="submit"]');

        const email = document.getElementById("newsletterEmail").value.trim();

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

            console.error(error);

            alert("❌ Subscription failed.");

        } finally {

            submitBtn.disabled = false;
            submitBtn.innerHTML = "Subscribe";

        }

    });

}