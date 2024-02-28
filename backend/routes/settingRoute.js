const express = require("express");

const tokenValidator = require("../shared/tokenValidator");
const { changeUsername, changePfp } = require("../services/settingService");

const router = express.Router();

router.post("/changeUsername", tokenValidator, async (req, res, next) => {
  const oldUsername = req.body.oldUsername;
  const newUsername = req.body.newUsername;

  const result = await changeUsername(oldUsername, newUsername);

  return res.status(result.code).json(result);
});

router.post("/changePfp", tokenValidator, async (req, res, next) => {
  const newPfp = req.body.newPfp;
  const token = req.header.authorization.split(" ")[1];

  const result = await changeUsername(newPfp, token);

  return res.status(result.code).json(result);
});

module.exports = router;
