// ======================================
// Giraja Shankar Official
// Contact Form (Firebase Firestore)
// ======================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill all fields.");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        try {

            await addDoc(collection(db, "contact_messages"), {

                name: name,
                email: email,
                message: message,
                createdAt: serverTimestamp()

            });

            alert("✅ Your message has been sent successfully.");

            contactForm.reset();

        } catch (error) {

            console.error("Contact Form Error:", error);

            alert("❌ Failed to send message. Please try again.");

        } finally {

            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";

        }

    });

} else {

    console.warn("Contact form not found.");

}