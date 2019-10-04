const express = require("express");
const functions = require("firebase-functions");
const router = require("./router");
const cors = require("cors");

const runTimeOpts = {
  timeoutSeconds: 180
};

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);
const api = functions.runWith(runTimeOpts).https.onRequest(app);
app.use("/", router);
module.exports = {
  api
};
