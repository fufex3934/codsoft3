import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(""); // To show errors if any
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      const postRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: serverTimestamp(),
        author: auth.currentUser.email,
      });
      console.log("Post created with ID:", postRef.id);
      navigate("/"); // Redirect to home after successful post creation
    } catch (error) {
      console.error("Error adding document: ", error.message); // More specific error log
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      {error && <p className="text-red-500">{error}</p>} {/* Show error message if there's any */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
