import { database } from "./firebaseConfig.js";
import {
  ref, push, set, get, update
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const db = ref(database, "musicas");

export async function salvarMusica(nome, url, user) {
  const nova = push(db);
  await set(nova, { nome, url, user, likes: 0 });
}

export async function listarMusicas() {
  const snap = await get(db);
  return snap.exists() ? snap.val() : {};
}

export async function curtir(id) {
  const musica = ref(database, "musicas/" + id);
  const snap = await get(musica);

  if (snap.exists()) {
    await update(musica, {
      likes: (snap.val().likes || 0) + 1
    });
  }
}