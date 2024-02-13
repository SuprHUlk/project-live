const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const google = async (username, email) => {
  try {
    let fetchedUser = await userModel.findOne({ email: email });

    //if user exists
    if (fetchedUser) {
      const token = getToken(
        fetchedUser.email,
        fetchedUser._id,
        fetchedUser.username
      );

      return {
        status: 200,
        msg: "Login successful",
        idToken: token,
        username: fetchedUser.username,
      };
    }

    //if user doesn't exist
    const result = await saveUser(username, email, process.env.SECRET);

    fetchedUser = await userModel.findOne({ email: email });
    const token = getToken(
      fetchedUser.email,
      fetchedUser._id,
      fetchedUser.username
    );

    return { status: 201, msg: "Login successful", idToken: token };
  } catch {
    return { status: 500, msg: "Login unsuccessful", error: err };
  }
};

const login = async (email, password) => {
  try {
    let fetchedUser = await userModel.findOne({ email: email });

    // User not found
    if (!fetchedUser) {
      return {
        status: 401,
        msg: "InvalidCredentials: Invalid email or password",
      };
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      fetchedUser.password
    );

    // Incorrect password
    if (!isPasswordCorrect) {
      return {
        status: 401,
        msg: "InvalidCredentials: Invalid email or password",
      };
    }

    const token = getToken(
      fetchedUser.email,
      fetchedUser._id,
      fetchedUser.username
    );

    return {
      status: 200,
      msg: "Login successful",
      idToken: token,
      username: fetchedUser.username,
    };
  } catch (err) {
    console.log(err);
    return { status: 401, msg: "UnknownError: Try again", error: err };
  }
};

const signup = async (username, email, password) => {
  try {
    //password length weak
    if (password.length < 6) {
      return {
        status: 400,
        msg: "WeakPassword: Password length must be greater than 6 character",
      };
    }

    const result = await saveUser(username, email, password);

    return { status: 201, msg: "Signup successful" };
  } catch (err) {
    console.log(err);
    return { status: 500, msg: "Signup unsuccessful", error: err };
  }
};

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
};

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
  } catch (err) {
    throw err;
  }
};

module.exports = { login, signup, google };
