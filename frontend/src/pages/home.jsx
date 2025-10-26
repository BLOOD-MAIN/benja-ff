import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import AccountGrid from '../components/AccountGrid';
import TopUpCenter from '../components/TopUpCenter';
import Comments from '../components/Comments';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) navigate('/');

    axios.get('http://localhost:5000/accounts', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAccounts(res.data))
      .catch(() => navigate('/'));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Banner />
      <AccountGrid accounts={accounts} />
      <TopUpCenter />
      <Comments />
    </div>
  );
}

export default Home;