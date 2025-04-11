// src/components/Post.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, "posts", id);
      const postData = await getDoc(postDoc);
      if (postData.exists()) {
        setPost(postData.data());
      }
    };
    fetchPost();

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [id]);

  const handleDelete = async () => {
    if (user) {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      navigate("/");
    } else {
      alert("You must be logged in to delete a post.");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
      {user && (
        <div>
          <button onClick={() => navigate(`/edit/${id}`)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      )}
    </div>
  );
}

export default Post;
