const axios = require("axios");

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

module.exports = { verify, details, stop, countViewers };
