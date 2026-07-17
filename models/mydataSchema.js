const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mydataSchema = new Schema({
  username: String,
});

const Mydata = mongoose.model("Mydata", mydataSchema);

module.exports = Mydata;
