import { useState, useEffect } from 'react';
import { getPackages } from '../api';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackages();
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        if (error.response?.status === 401) {
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading packages...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Travel Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: any) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => {/* Handle booking */}}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
