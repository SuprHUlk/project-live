const express = require("express");
const { liveStreams } = require("../services/dashboardService");

const tokenValidator = require("../shared/tokenValidator");

const router = express.Router();

router.get("/liveStreams", tokenValidator, async (req, res, next) => {
  const result = await liveStreams();
  return res.status(result.code).json(result);
});

module.exports = router;
