import { database } from "./firebaseConfig.js";
import {
  ref,
  push,
  get,
  remove
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

/* SALVAR */
export async function salvarMusica(nome, url, capa) {
  const tipo =
    url.includes("youtube") || url.includes("youtu.be")
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
  const snapshot = await get(ref(database, "musicas"));
  return snapshot.val() || {};
}

/* EXCLUIR */
export async function excluirMusica(id) {
  await remove(ref(database, "musicas/" + id));
}