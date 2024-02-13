const express = require("express");

const { login, signup, google } = require("../services/authService");

const router = express.Router();

router.post("/google", async (req, res, next) => {
  const { username, email } = req.body;
  const result = await google(username, email);
  return res.status(result.status).json(result);
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  return res.status(result.status).json(result);
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const result = await signup(username, email, password);
  return res.status(result.status).json(result);
});

module.exports = router;
