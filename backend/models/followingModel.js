const mongoose = require("mongoose");

const followingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  list: [
    {
      userId: { type: String, required: true },
    },
  ],
  count: { type: Number, require: true },
});

module.exports = mongoose.model("following", followingSchema);
