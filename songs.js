const express = require('express');
const multer = require('multer');
const Song = require('../models/Song');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('song'), async (req, res) => {
  const { title, artist } = req.body;
  const song = new Song({
    title,
    artist,
    filePath: req.file.path
  });
  await song.save();
  res.send(song);
});

router.get('/', async (req, res) => {
  const songs = await Song.find();
  res.send(songs);
});

module.exports = router;
