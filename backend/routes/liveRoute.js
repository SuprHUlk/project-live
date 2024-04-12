const express = require("express");
const {
  verify,
  details,
  stop,
  countViewers,
} = require("../services/liveService");
const tokenValidator = require("../shared/tokenValidator");

const router = express.Router();

router.post("/verify", async (req, res, next) => {
  const username = req.body.username;
  const key = req.body.key;

  const result = await verify(username, key);

  res.status(result.code).send();
});

router.post("/stop", async (req, res, next) => {
  const username = req.body.username;

  const result = await stop(username);

  res.status(result.code).send();
});

router.post("/countViewers", tokenValidator, async (req, res, next) => {
  const username = req.body.username;

  const result = await countViewers(username);

  res.status(result.code).send(result);
});

router.post("/details", tokenValidator, async (req, res, next) => {
  const streamDetails = req.body.streamDetails;
  const token = req.headers.authorization.split(" ")[1];
  const result = await details(streamDetails, token);
  return res.status(result.code).json(result);
});

module.exports = router;
