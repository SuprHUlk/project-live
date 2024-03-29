const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoute = require("./routes/authRoute");
const verifyRoute = require("./routes/verifyRoute");
const followingRoute = require("./routes/followingRoute");
const settingRoute = require("./routes/settingRoute");
const liveRoute = require("./routes/liveRoute");
const dashboardRoute = require("./routes/dashboardRoute");

const app = express();

require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:4200", ["http://localhost:8080"]];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    console.log("Received OPTIONS request");
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/test", (req, res, next) => {
//   console.log(req.headers);
//   res.status(200).json({ test: "test" });
// });

app.use("/auth", authRoute);
app.use("/verify", verifyRoute);
app.use("/following", followingRoute);
app.use("/setting", settingRoute);
app.use("/live", liveRoute);
app.use("/dashboard", dashboardRoute);

module.exports = app;
