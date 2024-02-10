const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const router = express.Router();

router.post("/google", async (req, res, next) => {
  try {
    let fetchedUser = await userModel.findOne({ email: req.body.email });

    //if user exists
    if(fetchedUser) {
      const token = getToken(fetchedUser.email, fetchedUser._id, fetchedUser.username);

      return res.status(200).json({
        msg: "Login successful",
        idToken: token,
        username: fetchedUser.username
      });
    }

    //if user doesn't exist
    const result = await saveUser(req.body.username, req.body.email, process.env.SECRET);
    fetchedUser = await userModel.findOne({ email: req.body.email });
    const token = getToken(fetchedUser.email, fetchedUser._id, fetchedUser.username);

    return res.status(201).json({
      msg: "Login successful",
      idToken: token
    });
  }
  catch {
    return res.status(500).json({
      msg: "Login unsuccessful",
      error: err,
    });
  }
})

router.post("/login", async (req, res, next) => {
  try {
    let fetchedUser = await userModel.findOne({ email: req.body.email });

    //user not present
    if (!fetchedUser) {
      return res.status(401).json({
        msg: "InvalidCredentials: Invalid email or password",
      });
    }

    //check if password is correct on not
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      fetchedUser.password
    );

    //password is wrong
    if (!isPasswordCorrect) {
      return res.status(401).json({
        msg: "InvalidCredentials: Invalid email or password",
      });
    }

    const token = getToken(fetchedUser.email, fetchedUser._id, fetchedUser.username);

    return res.status(200).json({
      msg: "Login successful",
      idToken: token,
      username: fetchedUser.username,
    });
  } catch (err) {
    return res.status(401).json({
      msg: "UnknownError: Try again",
      error: err,
    });
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    //password length weak
    if (req.body.password.length < 6) {
      return res.status(400).json({
        msg: "WeakPassword: Password length must be greater than 6 character",
      });
    }

    const result = await saveUser(req.body.username, req.body.email, req.body.password);

    return res.status(201).json({
      msg: "Signup successful",
    });
  } 
  catch (err) {
    return res.status(500).json({
      msg: "Signup unsuccessful",
      error: err,
    });
  }
});

const getToken = (email, userId, username) => {
  const SECRET = process.env.SECRET;

  const token = jwt.sign(
    {
      email: email,
      userId: userId,
      username: username,
    },
    SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

const saveUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const result = await data.save();

    return result;
  }
  catch(err) {
    throw err;
  }
}

module.exports = router;
