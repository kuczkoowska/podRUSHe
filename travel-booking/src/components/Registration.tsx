import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.email || !formData.firstName || !formData.lastName) {
      alert('Please fill in all fields');
      return false;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await register(formData);
      alert('Registration successful! You can now login.');
      navigate('/auth/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
      console.error('Registration error details:', error.response?.data || error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-white shadow-lg rounded-2xl max-w-sm w-full transform transition duration-300 hover:shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm"
          />
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 w-full rounded-lg text-gray-700 shadow-sm"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white font-medium px-4 py-3 rounded-lg w-full mt-6 hover:bg-blue-600 transition-all duration-200"
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account? 
          <Link to="/auth/login" className="text-blue-500 hover:underline"> Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
