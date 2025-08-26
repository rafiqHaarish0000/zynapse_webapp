// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtAh_sA5Fy8XBkNutLIu4WbImuQ2neffA",
  authDomain: "zynapseweb.firebaseapp.com",
  projectId: "zynapseweb",
  storageBucket: "zynapseweb.firebasestorage.app",
  messagingSenderId: "131696391118",
  appId: "1:131696391118:web:c650a751f3fe15df0ff19f",
  measurementId: "G-0K9DEDYMMN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
