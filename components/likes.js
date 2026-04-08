import { curtir } from "../firebase/database.js";

export function botaoCurtir(id) {
  return `<button onclick="curtir('${id}')">❤️</button>`;
}