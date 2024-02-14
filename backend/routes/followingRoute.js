const express = require("express");

const { add, remove, get } = require("../services/followingService");
const tokenValidator = require("../shared/tokenValidator");

const router = express.Router();

router.post("/add", tokenValidator, async (req, res, next) => {
  const { followingId } = req.body;
  const idToken = req.headers.authorization.split("Bearer ")[1];
  const result = await add(idToken, followingId);
  res.status(result.code).json(result);
});

router.post("/remove", tokenValidator, async (req, res, next) => {
  const { followingId } = req.body;
  const idToken = req.headers.authorization.split("Bearer ")[1];
  const result = await remove(idToken, followingId);
  res.status(result.code).json(result);
});

router.post("/get", tokenValidator, async (req, res, next) => {
  const idToken = req.headers.authorization.split("Bearer ")[1];
  const result = await get(idToken);
  res.status(result.code).json(result);
});

module.exports = router;
