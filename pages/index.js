import {
  salvarMusica,
  listarMusicas,
  excluirMusica
} from "../firebase/database.js";

const nomeInput = document.getElementById("nome");
const urlInput = document.getElementById("url");
const capaInput = document.getElementById("capa");
const lista = document.getElementById("lista");
const fileInput = document.getElementById("fileInput");

/* UPLOAD LOCAL */
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  await salvarMusica(file.name, url, "https://picsum.photos/200");

  carregar();
});

/* ADICIONAR */
document.getElementById("btnAdd").onclick = async () => {
  const nome = nomeInput.value;
  const url = urlInput.value;
  const capa = capaInput.value;

  if (!nome || !url || !capa) return alert("Preencha tudo");

  await salvarMusica(nome, url, capa);

  nomeInput.value = "";
  urlInput.value = "";
  capaInput.value = "";

  carregar();
};

/* LIMPAR */
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
      ${m.nome}
      <button onclick="del('${id}')">🗑️</button>
    `;

    lista.appendChild(div);
  }
}

window.del = async (id) => {
  await excluirMusica(id);
  carregar();
};

carregar();