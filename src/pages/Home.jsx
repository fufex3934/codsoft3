import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state for better UX
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "posts"));
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error("Error fetching posts: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            <Link to={`/edit/${post.id}`} className="text-blue-500">
              Edit
            </Link>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
