import { auth } from "../firebase/firebaseConfig.js";
import { logout } from "../firebase/auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { uploadMusica } from "../firebase/storage.js";
import { salvarMusica, listarMusicas, curtir } from "../firebase/database.js";

import { tocarMusica } from "../components/player.js";

/* PROTEÇÃO */
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "login.html";
});

/* LOGOUT */
document.getElementById("logout").onclick = logout;

/* UPLOAD */
document.getElementById("upload").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const url = await uploadMusica(file);
  await salvarMusica(file.name, url, auth.currentUser.email);
  carregar();
});

/* LISTA */
async function carregar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const dados = await listarMusicas();

  for (let id in dados) {
    const m = dados[id];

    const div = document.createElement("div");
    div.className = "musica";

    div.innerHTML = `
      <b>${m.nome}</b><br>
      👤 ${m.user}<br><br>

      <button onclick="play('${m.url}')">▶️</button>
      <button onclick="like('${id}')">❤️ ${m.likes || 0}</button>
      <a href="${m.url}" download>⬇️</a>
    `;

    lista.appendChild(div);
  }
}

/* GLOBAL */
window.play = tocarMusica;
window.like = async (id) => {
  await curtir(id);
  carregar();
};

carregar();