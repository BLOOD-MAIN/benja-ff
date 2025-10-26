import React from 'react';
import { useNavigate } from 'react-router-dom';

function TopUpCenter() {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-800 m-6 rounded text-center">
      <h2 className="text-2xl font-bold mb-4">Top Up Center</h2>
      <button
        onClick={() => navigate('/topup')}
        className="bg-red-600 hover:bg-red-700 p-3 rounded font-bold"
      >
        Go to Top Up
      </button>
    </div>
  );
}

export default TopUpCenter;