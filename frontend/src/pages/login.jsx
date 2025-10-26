import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
}

export default Login;