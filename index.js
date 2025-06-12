const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/spotify_clone')
    .then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
