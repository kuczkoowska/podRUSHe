import { useState } from "react";
import { login } from "../api";
import "tailwindcss";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem("token", response.data.token);
      alert('Login successful! Welcome back!');
      localStorage.setItem('userId', response.data.user.id);
      console.log('User ID saved in local storage:', localStorage.getItem('userId'));
      navigate("/packages");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed! Please check your credentials.';
      alert(errorMessage);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <form 
      onSubmit={handleSubmit} 
      className="p-8 bg-white shadow-lg rounded-2xl max-w-sm w-full transform transition duration-300 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
      <div className="space-y-4">
        <input 
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white font-medium px-4 py-3 rounded-lg w-full mt-6 hover:bg-blue-600 transition-all duration-200"
      >
        Login
      </button>
      <p className="mt-4 text-center text-gray-500 text-sm">
        Don't have an account? 
        <Link to="/auth/registration" className="text-blue-500 hover:underline"> Register here</Link>
      </p>
    </form>
  </div>
    
  );
}
