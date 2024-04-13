const liveModel = require("../models/liveModel");

const liveStreams = async (category) => {
  try {
    const result = await liveModel.find({ category: category });
    return { code: 200, result: result };
  } catch (error) {
    return { code: 500, error: error };
  }
};

module.exports = { liveStreams };
