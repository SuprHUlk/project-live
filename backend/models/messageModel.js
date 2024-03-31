const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  roomId: { type: String, require: true },
  text: { type: String, require: true },
  timeStamp: { type: Date, require: true },
});

module.exports = mongoose.model("message", messageSchema);
