/*=====================================================
   Giraja Shankar Official Website
   Professional Firebase Backend v1.0
======================================================*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
doc,
getDoc,
setDoc,
updateDoc,
increment,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


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
                COLLECTIONS
======================================================*/

const CONTACT_COLLECTION="contactMessages";

const NEWSLETTER_COLLECTION="newsletterSubscribers";

const COMMUNITY_COLLECTION="communityPosts";

const STATS_COLLECTION="websiteStats";


/*=====================================================
            COMMON FUNCTIONS
======================================================*/

function success(message){

alert(message);

}

function error(message){

alert(message);

}

function loading(button){

if(!button) return;

button.disabled=true;

button.dataset.old=button.innerHTML;

button.innerHTML="Please Wait...";

}

function stopLoading(button){

if(!button) return;

button.disabled=false;

button.innerHTML=button.dataset.old;

}


/*=====================================================
        FIREBASE READY
======================================================*/

window.firebaseDB=db;

console.log("Backend Ready...");
/*=====================================================
            CONTACT FORM (FIREBASE)
======================================================*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", async function (e) {

e.preventDefault();

const submitBtn = contactForm.querySelector("button[type='submit']");

loading(submitBtn);

try {

const formData = {

name: contactForm.querySelector("input[name='name']").value.trim(),

email: contactForm.querySelector("input[name='email']").value.trim(),

message: contactForm.querySelector("textarea[name='message']").value.trim(),

createdAt: serverTimestamp()

};

await addDoc(
collection(db, CONTACT_COLLECTION),
formData
);

stopLoading(submitBtn);

success("Message Sent Successfully.");

contactForm.reset();

/* Redirect */

window.location.href = "thankyou.html";

} catch (err) {

console.error(err);

stopLoading(submitBtn);

error("Unable to send message. Please try again.");

}

});

}
/*=====================================================
            NEWSLETTER
======================================================*/

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

newsletterForm.addEventListener("submit", async function(e){

e.preventDefault();

const btn = newsletterForm.querySelector("button[type='submit']");

loading(btn);

try{

const email = newsletterForm.querySelector("input[type='email']").value.trim();

await addDoc(collection(db, NEWSLETTER_COLLECTION),{

email: email,

createdAt: serverTimestamp()

});

stopLoading(btn);

success("Newsletter subscription successful.");

newsletterForm.reset();

}catch(err){

console.error(err);

stopLoading(btn);

error("Newsletter subscription failed.");

}

});

}


/*=====================================================
            COMMUNITY
======================================================*/

const communityForm = document.getElementById("communityForm");

if (communityForm) {

communityForm.addEventListener("submit", async function(e){

e.preventDefault();

const btn = communityForm.querySelector("button[type='submit']");

loading(btn);

try{

const data = {

name: communityForm.querySelector("input[name='name']").value.trim(),

email: communityForm.querySelector("input[name='email']").value.trim(),

createdAt: serverTimestamp()

};

await addDoc(collection(db, COMMUNITY_COLLECTION), data);

stopLoading(btn);

success("Community joined successfully.");

communityForm.reset();

}catch(err){

console.error(err);

stopLoading(btn);

error("Unable to join community.");

}

});

}
/*=====================================================
            VISITOR COUNTER
======================================================*/

async function updateVisitorCounter() {

try {

const counterRef = doc(db, STATS_COLLECTION, "visitors");

const counterSnap = await getDoc(counterRef);

if (!counterSnap.exists()) {

await setDoc(counterRef, {
count: 1,
updatedAt: serverTimestamp()
});

const el = document.getElementById("visitorCount");

if (el) el.textContent = "1";

return;

}

await updateDoc(counterRef, {

count: increment(1),

updatedAt: serverTimestamp()

});

const latest = await getDoc(counterRef);

const total = latest.data().count;

const el = document.getElementById("visitorCount");

if (el) {

el.textContent = total;

}

} catch (err) {

console.error("Visitor Counter Error:", err);

}

}

document.addEventListener("DOMContentLoaded", function(){

updateVisitorCounter();

});
