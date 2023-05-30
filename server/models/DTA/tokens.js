const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
  },
  refreshtoken: {
    type: String,
  },
});

module.exports = mongoose.model("token", tokenSchema);
