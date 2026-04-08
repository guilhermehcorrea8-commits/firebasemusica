import { login, register } from "../firebase/auth.js";
import { auth } from "../firebase/firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const email = document.getElementById("email");
const senha = document.getElementById("senha");

document.getElementById("btnEntrar").onclick = async () => {
  try {
    await login(email.value, senha.value);
  } catch (e) {
    alert(e.message);
  }
};

document.getElementById("btnCadastrar").onclick = async () => {
  try {
    await register(email.value, senha.value);
  } catch (e) {
    alert(e.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "home.html";
});