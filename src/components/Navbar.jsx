import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">Blog Platform</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/create" className="text-blue-500">Create Post</Link>
            <button onClick={() => signOut(auth)} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500">Login</Link>
            <Link to="/register" className="text-blue-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
