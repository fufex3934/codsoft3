// src/components/CreatePost.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(db, "posts"), {
          title,
          content,
          createdAt: new Date().toISOString(),
          userId: user.uid
        });
        alert("Post published successfully!");
        setTitle("");
        setContent("");
      } catch (error) {
        alert("Error publishing post: " + error.message);
      }
    } else {
      alert("You must be logged in to create a post.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
