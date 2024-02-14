const express = require("express");

const { idToken } = require("../services/verifyService");

const router = express.Router();

router.post("/idToken", (req, res, next) => {
  const result = idToken(req.body.idToken);
  res.status(result.code).json(result);
});

module.exports = router;
