// ======================================
// Giraja Shankar Official
// Article Views Tracker (Firebase)
// ======================================

import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/**
 * Track Article View
 * @param {string} articleId
 */
export async function trackArticleView(articleId) {

  if (!articleId) return;

  // LocalStorage Key
  const storageKey = "viewed_" + articleId;

  // Already counted within last 24 hours?
  const lastViewed = localStorage.getItem(storageKey);

  if (lastViewed) {
    const hours =
      (Date.now() - Number(lastViewed)) / (1000 * 60 * 60);

    if (hours < 24) {
      console.log("View already counted.");
      return;
    }
  }

  try {

    const articleRef = doc(db, "articleViews", articleId);

    const snap = await getDoc(articleRef);

    if (!snap.exists()) {

      await setDoc(articleRef, {
        views: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

    } else {

      await updateDoc(articleRef, {
        views: increment(1),
        updatedAt: serverTimestamp()
      });

    }

    localStorage.setItem(storageKey, Date.now());

    console.log("Article View Count Updated");

  } catch (error) {

    console.error("Article View Error:", error);

  }

}