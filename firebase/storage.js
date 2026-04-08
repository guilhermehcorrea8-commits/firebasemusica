import { storage } from "./firebaseConfig.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";

export async function uploadMusica(file) {
  const refStorage = ref(storage, "musicas/" + file.name);
  await uploadBytes(refStorage, file);
  return await getDownloadURL(refStorage);
}