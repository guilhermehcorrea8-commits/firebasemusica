import {
  salvarMusica,
  listarMusicas,
  limparMusicas,
  curtirMusica
} from "../firebase/database.js";

const nomeInput = document.getElementById("nome");
const urlInput = document.getElementById("url");
const capaInput = document.getElementById("capa");
const lista = document.getElementById("lista");

const audio = new Audio();

/* ADICIONAR */
document.getElementById("btnAdd").onclick = async () => {
  const nome = nomeInput.value;
  const url = urlInput.value;
  const capa = capaInput.value;

  if (!nome || !url || !capa) {
    alert("Preencha tudo");
    return;
  }

  await salvarMusica(nome, url, capa);

  nomeInput.value = "";
  urlInput.value = "";
  capaInput.value = "";

  carregar();
};

/* LIMPAR INPUTS */
document.getElementById("btnLimpar").onclick = () => {
  nomeInput.value = "";
  urlInput.value = "";
  capaInput.value = "";
};

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
      <button onclick="play('${m.url}', '${m.nome}')">▶</button>
    `;

    lista.appendChild(div);
  }
}

/* PLAYER */
window.play = (url, nome) => {
  audio.src = url;
  audio.play();
  alert("Tocando: " + nome);
};

carregar();