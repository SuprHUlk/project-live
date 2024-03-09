const userModel = require("../models/userModel");
const liveModel = require("../models/liveModel");

const verify = async (username, key) => {
  try {
    const user = await userModel.findOne({ username: username });

    if (!user || user.secretKey !== key) {
      return { code: 403 };
    }

    const data = {
      isLive: true,
    };

    await userModel.findByIdAndUpdate(user._id, data);

    return { code: 200 };
  } catch (e) {
    return { code: 403 };
  }
};

const stop = async (username) => {
  try {
    const data = {
      isLive: false,
    };

    const result = await userModel.findOneAndUpdate(
      { username: username },
      { $set: data },
      { new: true }
    );

    return { code: 200 };
  } catch (e) {
    return { code: 403 };
  }
};

const details = async (
  username,
  title,
  description,
  category,
  thumbnail,
  ageRestricted
) => {
  try {
    const data = new liveModel({
      username: username,
      title: title,
      description: description,
      category: category,
      thumbnail: thumbnail,
      ageRestricted: ageRestricted,
    });

    const result = await data.save();

    return { code: 201, result: result };
  } catch (e) {
    return { code: 400, error: e };
  }
};

module.exports = { verify, details, stop };
