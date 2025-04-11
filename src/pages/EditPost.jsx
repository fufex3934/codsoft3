import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      const docSnap = await getDoc(doc(db, "posts", id));
      if (docSnap.exists()) {
        const post = docSnap.data();
        setTitle(post.title);
        setContent(post.content);
      }
    };
    loadPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "posts", id), {
      title,
      content,
    });
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Update</button>
      </form>
    </div>
  );
}
