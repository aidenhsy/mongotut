const mongoose = require('mongoose');

const LyricSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  },
  content: { type: String },
});

module.exports = mongoose.model('Lyric', LyricSchema);
