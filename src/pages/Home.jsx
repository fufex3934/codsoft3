import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
          <Link to={`/edit/${post.id}`} className="text-blue-500">Edit</Link>
        </div>
      ))}
    </div>
  );
}