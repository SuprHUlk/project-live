const liveModel = require("../models/liveModel");

const liveStreams = async () => {
  try {
    const result = await liveModel.find();
    return { code: 200, result: result };
  } catch (error) {
    return { code: 500, error: error };
  }
};

module.exports = { liveStreams };
