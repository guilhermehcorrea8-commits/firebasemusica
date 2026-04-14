import { auth } from "../firebase/firebaseConfig.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const email = document.getElementById("email");
const senha = document.getElementById("senha");

document.getElementById("btnLogin").onclick = async () => {
  await signInWithEmailAndPassword(auth, email.value, senha.value);
};

document.getElementById("btnRegister").onclick = async () => {
  await createUserWithEmailAndPassword(auth, email.value, senha.value);
};

onAuthStateChanged(auth, user => {
  if (user) window.location.href = "index.html";
});