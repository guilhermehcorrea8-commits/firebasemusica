import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

export const login = (email, senha) =>
  signInWithEmailAndPassword(auth, email, senha);

export const register = (email, senha) =>
  createUserWithEmailAndPassword(auth, email, senha);

export const logout = () => signOut(auth);