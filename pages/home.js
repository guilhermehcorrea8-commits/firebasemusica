import { db } from "../firebase/firebaseConfig.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const lista = document.getElementById("lista");

const audio = new Audio();

/* LISTAR */
async function carregar() {
  const snap = await get(ref(db, "musicas"));

  if (!snap.exists()) return;

  lista.innerHTML = "";

  const dados = snap.val();

  for (let id in dados) {
    const m = dados[id];

    const div = document.createElement("div");
    div.className = "musica";

    div.innerHTML = `
      <img src="${m.capa}" width="50">
      ${m.nome}
      <button onclick="play('${m.url}', '${m.nome}', '${m.capa}')">▶</button>
    `;

    lista.appendChild(div);
  }
}

/* PLAYER */
window.play = (url, nome, capa) => {
  audio.src = url;
  audio.play();

  document.getElementById("infoMusica").innerText = nome;
  document.getElementById("capaMusica").src = capa;
};

/* CONTROLES */
btnPlay.onclick = () => audio.play();
btnPause.onclick = () => audio.pause();

/* BARRA */
setInterval(() => {
  if (!audio.duration) return;

  const p = (audio.currentTime / audio.duration) * 100;
  document.getElementById("barraPlayer").style.width = p + "%";
}, 500);

carregar();