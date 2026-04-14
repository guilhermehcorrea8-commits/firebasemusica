import { listarMusicas, excluirMusica } from "../firebase/database.js";

const lista = document.getElementById("lista");
const playerArea = document.getElementById("playerArea");

const audio = new Audio();

let tipoAtual = null;
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

      <button onclick="play('${m.url}', '${m.nome}', '${m.capa}', '${m.tipo}')">▶</button>
      <button onclick="del('${id}')">🗑</button>
    `;

    lista.appendChild(div);
  }
}

/* EXCLUIR */
window.del = async (id) => {
  if (confirm("Excluir música?")) {
    await excluirMusica(id);
    carregar();
  }
};

/* PLAYER */
window.play = (url, nome, capa, tipo) => {
  tipoAtual = tipo; // salva tipo atual

  document.getElementById("infoMusica").innerText = nome;
  document.getElementById("capaPlayer").src = capa;

  playerArea.innerHTML = "";

  audio.pause();
  audio.src = "";

  if (tipo === "youtube") {
    const id = extrairID(url);

    if (!id) {
      alert("Link inválido");
      return;
    }

    playerArea.innerHTML = `
      <iframe width="100%" height="200"
        src="https://www.youtube.com/embed/${id}?autoplay=1"
        allow="autoplay"
        frameborder="0"
        allowfullscreen>
      </iframe>
    `;
  } else {
    audio.src = url;

    audio.play().catch(() => {
      alert("Clique em play");
    });
  }
};

/* EXTRAIR ID YOUTUBE */
function extrairID(url) {
  const reg = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

  const match = url.match(reg);
  return match ? match[1] : null;
}

/* CONTROLES */
document.getElementById("btnPlay").onclick = () => {
  if (tipoAtual === "audio") {
    audio.play();
  }
};

document.getElementById("btnPause").onclick = () => {
  if (tipoAtual === "audio") {
    audio.pause();
  }
};

/* BARRA */
setInterval(() => {
  if (!audio.duration) return;

  const p = (audio.currentTime / audio.duration) * 100;
  document.getElementById("barraPlayer").style.width = p + "%";
}, 500);

carregar();
