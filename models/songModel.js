const mongoose = require("mongoose");

const songModelSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  artists: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  img: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

const Songs = mongoose.model('Songs', songModelSchema);

module.exports = Songs;
