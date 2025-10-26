const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('./models/Admin');
const Account = require('./models/Account');
const Comment = require('./models/Comment');
const TopUp = require('./models/TopUp');
const Banner = require('./models/Banner');
const verifyAdmin = require('./middleware/verifyAdmin');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ffstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ----- Routes -----

// Admin login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if(!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, admin.password);
  if(!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Accounts CRUD
app.get('/accounts', verifyAdmin, async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

app.post('/accounts', verifyAdmin, async (req, res) => {
  const account = new Account(req.body);
  await account.save();
  res.json(account);
});

app.put('/accounts/:id', verifyAdmin, async (req, res) => {
  const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(account);
});

app.delete('/accounts/:id', verifyAdmin, async (req, res) => {
  await Account.findByIdAndDelete(req.params.id);
  res.json({ message: 'Account deleted' });
});

// Banner
app.get('/banner', async (req, res) => {
  const banner = await Banner.findOne();
  res.json(banner);
});

app.post('/banner', verifyAdmin, async (req, res) => {
  let banner = await Banner.findOne();
  if(banner) {
    banner.image = req.body.image;
    banner.text = req.body.text;
    await banner.save();
  } else {
    banner = new Banner(req.body);
    await banner.save();
  }
  res.json(banner);
});

// Comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.json(comment);
});

// TopUp
app.get('/topups', async (req, res) => {
  const items = await TopUp.find();
  res.json(items);
});

app.post('/topups', verifyAdmin, async (req, res) => {
  const item = new TopUp(req.body);
  await item.save();
  res.json(item);
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));