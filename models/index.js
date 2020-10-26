const mongoose = require("mongoose");

const Users = require("./userModel.js");

const Songs = require("./songModel.js");

const uri = process.env.DATABASE_URL || "mongodb://localhost:27017/vis_server"

const connectDb = () => {
  return mongoose.connect(uri, { useNewUrlParser: true });
};

module.exports = {
  connectDb,
  models: {
    Users,
	Songs
  }
};
