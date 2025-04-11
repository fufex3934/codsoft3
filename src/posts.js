// src/posts.js
import { db } from "./firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const createPost = async (title, content) => {
  await addDoc(collection(db, "posts"), { title, content });
};

export const editPost = async (id, title, content) => {
  const postDoc = doc(db, "posts", id);
  await updateDoc(postDoc, { title, content });
};

export const deletePost = async (id) => {
  const postDoc = doc(db, "posts", id);
  await deleteDoc(postDoc);
};
