const express = require("express");
const {
  verify,
  details,
  stop,
  countViewers,
} = require("../services/liveService");

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

router.post("/countViewers", async (req, res, next) => {
  const username = req.body.username;

  const result = await countViewers(username);

  res.status(result.code).send(result);
});

module.exports = router;
