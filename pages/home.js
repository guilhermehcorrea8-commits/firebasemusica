import { listarMusicas } from "../firebase/database.js";

const lista = document.getElementById("lista");

const audio = new Audio();

/* LISTAR */
async function carregar() {
  lista.innerHTML = "";

  const dados = await listarMusicas();

  for (let id in dados) {
    const m = dados[id];

    const div = document.createElement("div");
    div.className = "musica";

    div.innerHTML = `
      <img src="${m.capa}" class="thumb">
      <span>${m.nome}</span>
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
  document.getElementById("capaPlayer").src = capa;
};

/* CONTROLES */
document.getElementById("btnPlay").onclick = () => audio.play();
document.getElementById("btnPause").onclick = () => audio.pause();

/* BARRA */
setInterval(() => {
  if (!audio.duration) return;

  const p = (audio.currentTime / audio.duration) * 100;
  document.getElementById("barraPlayer").style.width = p + "%";
}, 500);

carregar();