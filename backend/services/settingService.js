const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const changeUsername = async (oldUsername, newUsername) => {
  try {
    const usernameExist = await userModel.findOne({ username: newUsername });
    if (usernameExist) {
      return {
        code: 400,
        msg: "Not unique",
      };
    }

    const data = {
      username: newUsername,
    };

    const result = await userModel.findOneAndUpdate(
      { username: oldUsername },
      { $set: data },
      { new: true }
    );

    return { code: 201, msg: "Change successful", result: result.username };
  } catch (e) {
    return { code: 400, msg: "Error occurred", error: e };
  }
};

const changePfp = async (newPfp, token) => {
  try {
    const _id = jwt.verify(token, process.env.SECRET).userId;

    const data = { profilePic: newPfp };
    const result = await userModel.findOneAndUpdate(
      _id,
      { $set: data },
      { new: true }
    );

    return { code: 201, msg: "Update Successful", result: result.profilePic };
  } catch (e) {
    return { code: 400, msg: "Update unsuccessful", error: e };
  }
};

module.exports = { changeUsername, changePfp };
