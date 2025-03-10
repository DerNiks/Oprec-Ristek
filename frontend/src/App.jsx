import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TryoutPlay from "./components/TryoutPlay";
import Login from "./components/Login";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container mx-auto p-4">
          <Routes> 
            <Route path="/login" element={<Login />} />
            <Route path="/tryout/:id" element={<TryoutPlay />} />
            <Route path="/" element={<h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">Welcome to Quiz Platform</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;