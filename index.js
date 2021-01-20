const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const Lyric = require('./models/Lyric');
const Song = require('./models/Song');

dotenv.config();
connectDB();

app.use(express.json());

app.post('/api/songs', async (req, res) => {
  const title = req.body.title;
  const newSong = await Song.create({ title });
  res.json(newSong);
});

app.post('/api/lyrics', async (req, res) => {
  const songId = req.body.songId;
  const song = await Song.findOne({ _id: songId });
  res.json(await song.addLyric(req.body));
});

app.get('/api/songs/:id', async (req, res) => {
  const songId = req.params.id;
  const song = await Song.findById(songId).populate('lyrics', 'content');
  res.json(song);
});

app.listen(4000, () => {
  console.log('listening on 4000');
});
