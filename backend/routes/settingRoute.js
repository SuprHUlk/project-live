const express = require("express");

const tokenValidator = require("../shared/tokenValidator");
const {
  changeUsername,
  changePfp,
  changeBio,
  changeSocials,
  get,
} = require("../services/settingService");

const router = express.Router();

router.post("/changeUsername", tokenValidator, async (req, res, next) => {
  const oldUsername = req.body.oldUsername;
  const newUsername = req.body.newUsername;

  const result = await changeUsername(oldUsername, newUsername);

  return res.status(result.code).json(result);
});

router.post("/changePfp", tokenValidator, async (req, res, next) => {
  const newPfp = req.body.newPfp;
  const token = req.headers.authorization.split(" ")[1];

  const result = await changePfp(newPfp, token);

  return res.status(result.code).json(result);
});

router.post("/changeBio", tokenValidator, async (req, res, next) => {
  const newBio = req.body.newBio;
  const token = req.headers.authorization.split(" ")[1];

  const result = await changeBio(newBio, token);

  return res.status(result.code).json(result);
});

router.post("/changeSocials", tokenValidator, async (req, res, next) => {
  const newSocials = req.body.newSocials;
  const token = req.headers.authorization.split(" ")[1];
  const result = await changeSocials(newSocials, token);

  return res.status(result.code).json(result);
});

router.get("/get", tokenValidator, async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const result = await get(token);

  return res.status(result.code).json(result);
});

module.exports = router;
