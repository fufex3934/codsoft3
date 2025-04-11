import { useState } from "react";
import { auth } from "../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      title,
      content,
      createdAt: serverTimestamp(),
      author: auth.currentUser.email,
    });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Publish</button>
      </form>
    </div>
  );
}
