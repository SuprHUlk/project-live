const axios = require("axios");
const jwt = require("jsonwebtoken");

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

    await userModel.findOneAndUpdate(
      { username: username },
      { $set: data },
      { new: true }
    );

    await liveModel.deleteOne({ username: username });

    return { code: 200 };
  } catch (e) {
    return { code: 403 };
  }
};

const details = async (streamDetails, token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const _id = decodedToken.userId;

    const stream = await liveModel.findOne({ username: username });
    if (stream) {
      return { code: 400, error: "Already live" };
    }

    const user = await userModel.findById(_id);
    const isLive = user.isLive;

    if (!isLive) {
      return { code: 400, error: "Not live" };
    }

    const { title, description, category, tags } = streamDetails;
    const data = new liveModel({
      username: username,
      title: title,
      description: description,
      category: category,
      // thumbnail: thumbnail,
      tags: tags,
    });

    const result = await data.save();

    return { code: 201, result: result };
  } catch (e) {
    console.log(e);
    return { code: 500, error: e };
  }
};

const getDetails = async (_id) => {
  try {
    const stream = await liveModel.findById(_id);
    if (stream) {
      return { code: 200, result: stream };
    }
    return { code: 400, msg: "No stream found" };
  } catch (error) {
    return { code: 500, error: error };
  }
};

const countViewers = async (username) => {
  try {
    const response = await axios.get("http://nginx_server:8080/log");

    const logLines = response.data.split("\n");

    const regex = /\/hls\/\w+(?:-\d+)?\.(?:m3u8|ts)/;

    const curDate = new Date().getTime();
    const viewers = new Set();

    logLines.forEach((line) => {
      if (line === "") return;

      const parts = line.split(" ");
      const match = parts[6].match(regex);

      if (!match || parts.length !== 23) return;

      if (
        username === parts[6].split("/")[2].split("-")[0] ||
        username === parts[6].split("/")[2].split(".")[0]
      ) {
        const ip = parts[0];
        const dateStr = parts[3].replace("[", "").replace("]", "");
        timeDifference = getTimeDifference(dateStr, curDate);
        if (timeDifference > 20000) return;
        if (!viewers.has(ip)) viewers.add(ip);
      }
    });
    return { code: 200, result: viewers.size };
  } catch (error) {
    console.log(error);
    return { code: 400, error: error.message };
  }
};

const getTimeDifference = (dateStr, curDate) => {
  const [day, month, temp] = dateStr.split("/");
  const [year, hour, minute, second] = temp.split(":");
  const providedDate = new Date(
    year,
    getMonthIndex(month),
    day,
    hour,
    minute,
    second
  );
  return curDate - providedDate.getTime();
};

const getMonthIndex = (month) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.indexOf(month);
};

module.exports = { verify, details, getDetails, stop, countViewers };
