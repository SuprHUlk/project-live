const jwt = require("jsonwebtoken");

const followingModel = require("../models/followingModel");
const userModel = require("../models/userModel");

const add = async (token, followingId) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = await followingModel.findOne({ userId: userId });

    //user doesn't exists
    if (!fetchedUser) {
      console.log();
      const result = await saveUser(userId, followingId, [], 0);
      return { code: 200, msg: "Follow successful" };
    }

    let isFollowing = false;

    fetchedUser.followingList.forEach((element) => {
      if (element.followingId === followingId) {
        isFollowing = true;
      }
    });

    //not already following
    if (!isFollowing) {
      const result = await followingModel.findOneAndUpdate(
        { userId: userId },
        {
          $push: { followingList: { followingId: followingId } },
          $inc: { count: 1 },
        },
        { new: true }
      );
    }
    return { code: 200, msg: "Follow successful" };
  } catch (err) {
    return { code: 500, error: err };
  }
};

const remove = async (token, followingId) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = await followingModel.findOne({ userId: userId });
    const newFollowingList = unFollow(fetchedUser.followingList, followingId);

    const result = await followingModel.findOneAndUpdate(
      { userId: userId },
      { followingList: newFollowingList, count: fetchedUser.count - 1 },
      { new: true }
    );

    return { code: 201, msg: "UnFollow successful" };
  } catch (err) {
    return { code: 500, error: err };
  }
};

const get = async (token) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = await followingModel.findOne({ userId: userId });

    //user doesn't exist
    if (!fetchedUser) return { code: 200, followingList: [] };

    let list = [];
    const promises = fetchedUser.followingList.map(async (element) => {
      return await userModel.findById(element.followerId);
    });

    const results = await Promise.all(promises);

    results.forEach((result) => {
      list.push(result);
    });

    return { code: 200, followingList: list };
  } catch (err) {
    return { code: 500, msg: "Retrieval error" };
  }
};

const saveUser = async (userId, followingId, followingList, count) => {
  try {
    const data = new followingModel({
      userId: userId,
      followingList: [
        ...followingList,
        {
          followingId: followingId,
        },
      ],
      count: count + 1,
    });

    const result = await data.save();

    return result;
  } catch (err) {
    throw err;
  }
};

const unFollow = (followingList, toDeleteId) => {
  return followingList.filter(
    (following) => following.followingId !== toDeleteId
  );
};

module.exports = { add, remove, get };
