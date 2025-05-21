
//SHALINI
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookFormDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema matching the form
const entrySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  type: String,
  bookName: String,
  author: String,
  quantity: Number,
  condition: String,
  email: String,
  phone: String,
  address: String
});

const Entry = mongoose.model('Entry', entrySchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all entries
app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST a new entry
app.post('/api/entries', async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE an entry by ID
app.delete('/api/entries/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Delete failed');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

