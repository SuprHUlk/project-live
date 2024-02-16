const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const add = async (token, followingId) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = await userModel.findById(userId);
    let check = isFollowing(fetchedUser.followingList, followingId);

    if (check) {
      return {
        code: 200,
        result: fetchedUser.followingList,
        msg: "Follow successful",
      };
    }

    const newFollowingList = [
      ...fetchedUser.followingList,
      { followingId: followingId },
    ];

    const data = {
      followingList: newFollowingList,
      followingCount:
        fetchedUser.followingCount === undefined
          ? 1
          : fetchedUser.followingCount + 1,
    };

    const result = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return {
      code: 201,
      result: result.followingList,
      msg: "Follow successful",
    };
  } catch (err) {
    return { code: 500, error: err, msg: "Follow unsuccessful" };
  }
};

const remove = async (token, followingIdToUnFollow) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = await userModel.findById(userId);

    let check = isFollowing(fetchedUser.followingList, followingIdToUnFollow);

    if (!check) {
      return {
        code: 200,
        result: fetchedUser.followingList,
        msg: "UnFollow successful",
      };
    }

    const newFollowingList = fetchedUser.followingList.filter(
      (element) => element.followingId !== followingIdToUnFollow
    );

    const result = await userModel.findByIdAndUpdate(
      userId,
      {
        followingList: newFollowingList,
        followingCount: fetchedUser.followingCount - 1,
      },
      { new: true }
    );

    return {
      code: 201,
      result: result.followingList,
      msg: "UnFollow successful",
    };
  } catch (err) {
    console.log(err);
    return { code: 500, error: err, msg: "UnFollow Unsuccessful" };
  }
};

const get = async (token) => {
  try {
    const userId = jwt.verify(token, process.env.SECRET).userId;
    const fetchedUser = await userModel.findById(userId);

    if (fetchedUser.followingList.length === 0)
      return { code: 200, result: [], msg: "Retrieval successful" };

    let list = [];
    const promises = fetchedUser.followingList.map(async (element) => {
      const user = await userModel.findById(element.followingId);
      const data = {
        userId: user._id,
        username: user.username,
        followerCount: user.followerCount,
        followingCount: user.followingCount,
      };

      return data;
    });

    const results = await Promise.all(promises);

    results.forEach((result) => {
      list.push(result);
    });

    return { code: 200, result: list, msg: "Retrieval successful" };
  } catch (err) {
    return { code: 500, msg: "Retrieval error", error: err };
  }
};

const isFollowing = (followingList, followingId) => {
  let check = false;
  followingList.forEach((element) => {
    if (element.followingId === followingId) {
      check = true;
    }
  });
  return check;
};

module.exports = { add, remove, get };
