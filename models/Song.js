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

SongSchema.methods.addLyric = async function ({ content }) {
  const newLyric = await Lyric.create({ song: this._id, content: content });
  console.log(this);
  this.lyrics.push(newLyric._id);
  this.save();
  return newLyric;
};

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;
