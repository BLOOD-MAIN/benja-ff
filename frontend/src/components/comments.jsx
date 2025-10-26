import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Comments() {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/comments')
      .then(res => setComments(res.data));
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/comments', { username, comment })
      .then(res => setComments([...comments, res.data]));
    setUsername('');
    setComment('');
  };

  return (
    <div className="p-6 bg-gray-800 m-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
        <input 
          type="text" placeholder="Name" value={username}
          onChange={e => setUsername(e.target.value)}
          className="p-2 rounded w-full mb-2"
        />
        <textarea 
          placeholder="Comment" value={comment}
          onChange={e => setComment(e.target.value)}
          className="p-2 rounded w-full mb-2"
        />
        <button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700 p-2 rounded text-white font-bold">
          Submit
        </button>
      </div>
      <div>
        {comments.map(c => (
          <div key={c._id} className="border-b border-gray-700 py-2">
            <strong>{c.username}:</strong> {c.comment}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;