const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  profilePic: { type: String },
  isLive: { type: Boolean },
  followerCount: { type: Number, require: true },
  bio: { type: String },
  socials: {
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    discord: { type: String },
  },
  followingList: [
    {
      followingId: { type: String, required: true },
    },
  ],
  followingCount: { type: Number, require: true },
  secretKey: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
