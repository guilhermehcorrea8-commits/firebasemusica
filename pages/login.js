import { auth } from "../firebase/firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");

btnLogin.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, senha.value);
  } catch (e) {
    alert(e.message);
  }
};

btnRegister.onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, senha.value);
  } catch (e) {
    alert(e.message);
  }
};

onAuthStateChanged(auth, user => {
  if (user) window.location.href = "index.html";
});