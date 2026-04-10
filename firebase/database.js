import { database } from "./firebaseConfig.js";

import {
  ref,
  push,
  set,
  get,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

/* REFERÊNCIA PRINCIPAL */
const dbRef = ref(database, "musicas");

/* =========================
   🎵 SALVAR MÚSICA
========================= */
export async function salvarMusica(nome, url, capa) {
  const nova = push(dbRef);

  await set(nova, {
    nome: nome,
    url: url,
    capa: capa,
    likes: 0,
    criadoEm: Date.now()
  });
}

/* =========================
   📥 LISTAR MÚSICAS
========================= */
export async function listarMusicas() {
  const snap = await get(dbRef);

  if (snap.exists()) {
    return snap.val();
  } else {
    return {};
  }
}

/* =========================
   🗑️ LIMPAR TODAS
========================= */
export async function limparMusicas() {
  await remove(dbRef);
}

/* =========================
   ❤️ CURTIR MÚSICA
========================= */
export async function curtirMusica(id) {
  const musicaRef = ref(database, "musicas/" + id);

  const snap = await get(musicaRef);

  if (snap.exists()) {
    const atual = snap.val().likes || 0;

    await update(musicaRef, {
      likes: atual + 1
    });
  }
}