// src/components/EditPost.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, "posts", id);
      const post = await getDoc(postDoc);
      if (post.exists()) {
        setTitle(post.data().title);
        setContent(post.data().content);
      }
    };
    fetchPost();

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const postDoc = doc(db, "posts", id);
      await updateDoc(postDoc, { title, content });
      navigate(`/post/${id}`);
    } else {
      alert("You must be logged in to edit a post.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-2 mb-4 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 mb-4 w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
}

export default EditPost;
