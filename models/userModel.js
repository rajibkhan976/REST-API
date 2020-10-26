const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validator: (v) => {
      return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  }
});

const Users = mongoose.model('Users', userModelSchema);

module.exports = Users;
