const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const router = express.Router();

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

    const SECRET = process.env.SECRET;

    const token = jwt.sign(
      {
        email: fetchedUser.email,
        userId: fetchedUser._id,
        username: fetchedUser.username,
      },
      SECRET,
      {
        expiresIn: "5h",
      }
    );

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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await data.save();

    return res.status(201).json({
      msg: "Signup successful",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Signup unsuccessful",
      error: err,
    });
  }
});

module.exports = router;
