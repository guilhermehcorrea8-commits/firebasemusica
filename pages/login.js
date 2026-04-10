import { auth } from "../firebase/firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

/* ELEMENTOS */
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");

/* LOGIN */
btnLogin.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, senha.value);
  } catch (e) {
    alert("Erro: " + e.message);
  }
};

/* CADASTRO */
btnRegister.onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, senha.value);
  } catch (e) {
    alert("Erro: " + e.message);
  }
};

/* REDIRECIONAMENTO */
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "index.html";
  }
});