import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl">Quiz Platform</Link>
        {user ? (
          <button onClick={logout} className="btn text-white">Logout</button>
        ) : (
          <Link to="/login" className="text-white">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
