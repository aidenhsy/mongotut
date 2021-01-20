const mongoose = require('mongoose');
const Lyric = require('./Lyric');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lyrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lyric',
    },
  ],
});

SongSchema.statics.addLyric = async function ({ songId, content }) {
  const song = await Song.findOne({ _id: songId });
  const newLyric = await Lyric.create({ song: songId, content: content });
  song.lyrics.push(newLyric._id);
  song.save();
  return newLyric;
};

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;
