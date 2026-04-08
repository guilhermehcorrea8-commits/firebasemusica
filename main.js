import { uploadMusica } from "./firebase/storage.js";
import { salvarMusica, listarMusicas } from "./firebase/database.js";
import { tocarMusica } from "./components/player.js";

const upload = document.getElementById("upload");
const lista = document.getElementById("lista");

/* UPLOAD */
upload.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  const url = await uploadMusica(file);

  await salvarMusica(file.name, url, "user");

  carregar();
});

/* LISTA */
async function carregar() {
  lista.innerHTML = "";

  const dados = await listarMusicas();

  for (let id in dados) {
    const m = dados[id];

    const div = document.createElement("div");

    div.innerHTML = `
      🎵 ${m.nome}
      <button onclick="play('${m.url}')">▶️</button>
      <button>❤️</button>
    `;

    lista.appendChild(div);
  }
}

window.play = tocarMusica;

carregar();