const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const liveSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  thumbnail: { type: String },
  tags: { type: [String] },
});

liveSchema.plugin(uniqueValidator);

module.exports = mongoose.model("live", liveSchema);
