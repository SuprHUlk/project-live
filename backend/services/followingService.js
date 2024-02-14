const jwt = require("jsonwebtoken");

const followingModel = require("../models/followingModel");

const add = async (token, followingId) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = followingModel.findOne({ userId: userId });
    console.log(fetchedUser);
    //user doesn't exists
    if (!fetchedUser) {
      const result = await saveUser(followingId, [], 0);
      return { code: 200, msg: "Follow successful" };
    }

    const result = await saveUser(
      userId,
      followingId,
      fetchedUser.followingList,
      fetchedUser.count
    );
    return { code: 200, msg: "Follow successful" };
  } catch (err) {
    return { code: 500, error: err };
  }
};

const remove = async (token, followingId) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = followingModel.findOne({ userId: userId });
    const newFollowingList = unFollow(fetchedUser.followingList, followingId);

    const result = await saveUser(
      userId,
      followingId,
      newFollowingList,
      fetchedUser.count - 1
    );
    return { code: 201, msg: "UnFollow successful" };
  } catch (err) {
    return { code: 500, error: err };
  }
};

const get = async (token) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).split("Bearer ")[1];
    const fetchedUser = followingModel.findOne({ userId: userId });

    //user doesn't exist
    if (!fetchedUser) return { code: 200, followingList: [] };
    return { code: 200, followingList: fetchedUser.followingList };
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
