import { db } from "../firebase/firebaseConfig.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const nome = document.getElementById("nome");
const url = document.getElementById("url");
const capa = document.getElementById("capa");

btnAdd.onclick = async () => {
  if (!nome.value || !url.value) return alert("Preencha tudo");

  const musicaRef = ref(db, "musicas");

  const nova = push(musicaRef);

  await set(nova, {
    nome: nome.value,
    url: url.value,
    capa: capa.value
  });

  alert("Salvo!");

  nome.value = "";
  url.value = "";
  capa.value = "";
};