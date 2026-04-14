import {
  listarMusicas,
  excluirMusica,
  editarMusica,
} from "../firebase/database.js";

const lista = document.getElementById("lista");
const playerArea = document.getElementById("playerArea");

const audio = new Audio();

let tipoAtual = null;
let musicasArray = [];
let indexAtual = 0;

/* =========================
   LISTAR MÚSICAS
========================= */
async function carregar() {
  lista.innerHTML = "";

  const dados = await listarMusicas();

  musicasArray = [];
  let i = 0;

  for (let id in dados) {
    const m = dados[id];

    musicasArray.push({ id, ...m });

    const div = document.createElement("div");
    div.className = "musica";

    div.innerHTML = `
      <img src="${m.capa}" class="thumb">
      <span>${m.nome}</span>

      <button onclick="playIndex(${i})">▶</button>
      <button onclick="editar('${id}', '${m.nome}', '${m.capa}')">✏️</button>
      <button onclick="del('${id}')">🗑</button>
    `;

    lista.appendChild(div);
    i++;
  }
}

/* =========================
   TOCAR POR INDEX
========================= */
window.playIndex = (i) => {
  indexAtual = i;
  const m = musicasArray[i];
  play(m.url, m.nome, m.capa, m.tipo);
};

/* =========================
   PRÓXIMA / ANTERIOR
========================= */
window.proxima = () => {
  if (indexAtual < musicasArray.length - 1) {
    indexAtual++;
    playIndex(indexAtual);
  }
};

window.anterior = () => {
  if (indexAtual > 0) {
    indexAtual--;
    playIndex(indexAtual);
  }
};

/* =========================
   EXCLUIR
========================= */
window.del = async (id) => {
  if (confirm("Excluir música?")) {
    await excluirMusica(id);
    carregar();
  }
};

/* =========================
   EDITAR
========================= */
window.editar = async (id, nomeAtual, capaAtual) => {
  const novoNome = prompt("Novo nome:", nomeAtual);
  if (!novoNome) return;

  const novaCapa = prompt("Nova capa:", capaAtual);
  if (!novaCapa) return;

  await editarMusica(id, {
    nome: novoNome,
    capa: novaCapa,
  });

  carregar();
};

/* =========================
   PLAYER PRINCIPAL
========================= */
window.play = (url, nome, capa, tipo) => {
  tipoAtual = tipo;

  document.getElementById("infoMusica").innerText = nome;
  document.getElementById("capaPlayer").src = capa;

  playerArea.innerHTML = "";

  audio.pause();
  audio.src = "";

  /* 🎥 YOUTUBE */
  if (tipo === "youtube") {
    const id = extrairID(url);

    if (!id) {
      alert("Link inválido");
      return;
    }

    playerArea.innerHTML = `
      <div style="max-width: 400px;">
        <iframe width="100%" height="200"
          src="https://www.youtube.com/embed/${id}?autoplay=1"
          frameborder="0"
          allow="autoplay"
          allowfullscreen>
        </iframe>

        <button onclick="abrirYoutube('${id}')" class="btn" style="margin-top:5px;">
          🔗 Abrir no YouTube
        </button>
      </div>
    `;
  } else {

  /* 🎵 AUDIO */
    audio.src = url;

    audio.play().catch(() => {
      alert("Clique em play");
    });
  }
};

/* =========================
   ABRIR YOUTUBE
========================= */
window.abrirYoutube = (id) => {
  window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
};

/* =========================
   EXTRAIR ID YOUTUBE
========================= */
function extrairID(url) {
  const reg = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = url.match(reg);
  return match ? match[1] : null;
}

/* =========================
   CONTROLES
========================= */
document.getElementById("btnPlay").onclick = () => {
  if (tipoAtual === "audio") audio.play();
};

document.getElementById("btnPause").onclick = () => {
  if (tipoAtual === "audio") audio.pause();
};

/* =========================
   BARRA DE PROGRESSO
========================= */
setInterval(() => {
  if (!audio.duration) return;

  const p = (audio.currentTime / audio.duration) * 100;
  document.getElementById("barraPlayer").style.width = p + "%";
}, 500);

/* =========================
   AUTO PRÓXIMA
========================= */
audio.onended = () => {
  proxima();
};

carregar();
