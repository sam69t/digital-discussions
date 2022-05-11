//? SETUP VIDEO SDK //?

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const PORT = 3000;
const app = express();

const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });
const open = require("open");
const server = require("./server/server.js");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// let server = app.listen(3000, "0.0.0.0");
// let socket = require("socket.io");
// let io = socket(server);
// let client = io.sockets.clients();

// app.listen(PORT, () => {
//   console.log(`API server listening at http://localhost:${PORT}`);
// });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(express.static("public"));

// app.listen(3000, () => {
//   console.log("alive");
// });
// //
// app.get("/get-token", (req, res) => {
//   const API_KEY = process.env.VIDEOSDK_API_KEY;
//   const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

//   const options = { expiresIn: "10m", algorithm: "HS256" };

//   const payload = {
//     apikey: API_KEY,
//     permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
//   };

//   const token = jwt.sign(payload, SECRET_KEY, options);
//   res.json({ token });
// });

// //
// app.post("/create-meeting/", (req, res) => {
//   const { token, region } = req.body;
//   const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
//   const options = {
//     method: "POST",
//     headers: { Authorization: token, "Content-Type": "application/json" },
//     body: JSON.stringify({ region }),
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((result) => res.json(result)) // result will contain meetingId
//     .catch((error) => console.error("error", error));
// });

// //
// app.post("/validate-meeting/:meetingId", (req, res) => {
//   const token = req.body.token;
//   const meetingId = req.params.meetingId;

//   const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

//   const options = {
//     method: "POST",
//     headers: { Authorization: token },
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((result) => res.json(result)) // result will contain meetingId
//     .catch((error) => console.error("error", error));
// });

// ---_____---------_---------_____--__-__-_______-

const { PRIVATE_KEY, PUBLIC_KEY, URL_ENDPOINT, SERVER_PORT } = dotenv.parsed;

if (!PRIVATE_KEY || !PUBLIC_KEY || !URL_ENDPOINT || !SERVER_PORT) {
  throw new Error("Missing values in the '.env' file.");
}

server
  .startServer(SERVER_PORT, PUBLIC_KEY, PRIVATE_KEY, URL_ENDPOINT)
  .then(() => {
    try {
      console.log("done");
      return open(`http://localhost:${SERVER_PORT}`, { wait: true });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  })
  .then(() => {
    console.log("Exiting app.");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error:", JSON.stringify(err, null, 2));
    process.exit(1);
  });
