// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Blog Platform</Link>
        <div>
          <Link to="/login" className="text-white mx-2">Login</Link>
          <Link to="/register" className="text-white mx-2">Register</Link>
          <Link to="/create" className="text-white mx-2">Create Post</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
