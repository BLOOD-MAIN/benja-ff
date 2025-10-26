import React from 'react';

function AccountGrid({ accounts }) {
  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {accounts.map(acc => (
        <div key={acc._id} className="bg-gray-800 p-4 rounded shadow hover:scale-105 transition">
          <img src={acc.photo} alt={acc.username} className="w-full h-32 object-cover rounded mb-2"/>
          <h2 className="font-bold">{acc.username}</h2>
          <p>{acc.rank} - {acc.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AccountGrid;