import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">ScalableApp</Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-1 rounded hover:bg-gray-100">Dashboard</Link>
              <Link to="/profile" className="px-3 py-1 rounded hover:bg-gray-100">Profile</Link>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
              <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
