import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Banner() {
  const [banner, setBanner] = useState({ image: '', text: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/banner').then(res => setBanner(res.data || {}));
  }, []);

  return (
    <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
      {banner.image && <img src={banner.image} alt="banner" className="w-full h-full object-cover opacity-80" />}
      <h1 className="absolute text-4xl font-bold">{banner.text}</h1>
    </div>
  );
}

export default Banner;