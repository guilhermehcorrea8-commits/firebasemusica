import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAm_aLIIeRUg9izArMoLa5G08fMtM45cRo",
  authDomain: "musica-5-2b46b.firebaseapp.com",
  databaseURL: "https://musica-5-2b46b-default-rtdb.firebaseio.com",
  projectId: "musica-5-2b46b",
  storageBucket: "musica-5-2b46b.firebasestorage.app",
  messagingSenderId: "369795771425",
  appId: "1:369795771425:web:220374bf64a1963f040760",
  measurementId: "G-X6693TM3QJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);