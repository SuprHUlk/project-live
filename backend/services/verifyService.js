const jwt = require("jsonwebtoken");

const idToken = (idToken) => {
  const SECRET = process.env.SECRET;
  try {
    if (jwt.verify(idToken, SECRET)) {
      return { code: 200, status: true };
    }
  } catch (err) {
    return { code: 401, status: false };
  }
};

module.exports = { idToken };
