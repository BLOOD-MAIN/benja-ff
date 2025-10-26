const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

function verifyAdmin(req, res, next) {
  const token = req.headers['authorization'];
  if(!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Invalid token' });
    req.admin = decoded.username;
    next();
  });
}

module.exports = verifyAdmin;