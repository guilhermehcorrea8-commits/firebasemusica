import { database } from "./firebaseConfig.js";
import {
  ref,
  push,
  get,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

/* SALVAR */
export async function salvarMusica(nome, url, capa) {
  const tipo =
    url.startsWith("blob:")
      ? "local"
      : url.includes("youtube") || url.includes("youtu.be")
      ? "youtube"
      : "audio";

  await push(ref(database, "musicas"), {
    nome,
    url,
    capa,
    tipo
  });
}

/* LISTAR */
export async function listarMusicas() {
  const snap = await get(ref(database, "musicas"));
  return snap.val() || {};
}

/* EXCLUIR */
export async function excluirMusica(id) {
  await remove(ref(database, "musicas/" + id));
}

/* EDITAR */
export async function editarMusica(id, dados) {
  await update(ref(database, "musicas/" + id), dados);
}