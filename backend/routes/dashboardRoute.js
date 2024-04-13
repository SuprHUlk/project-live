const express = require("express");
const { liveStreams } = require("../services/dashboardService");

const tokenValidator = require("../shared/tokenValidator");

const router = express.Router();

router.get("/liveStreams", tokenValidator, async (req, res, next) => {
  const category = req.query.category;
  const result = await liveStreams(category);
  return res.status(result.code).json(result);
});

module.exports = router;
