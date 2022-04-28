//? SETUP VIDEO SDK //?

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: fetch } = require("node-fetch");
const jwt = require("jsonwebtoken");

// const PORT = 3000;
const app = express();

let server = app.listen(3000, "0.0.0.0");
let socket = require("socket.io");
let io = socket(server);
// let client = io.sockets.clients();

// app.listen(PORT, () => {
//   console.log(`API server listening at http://localhost:${PORT}`);
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static("public"));

//
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//
app.get("/get-token", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "10m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

//
app.post("/create-meeting/", (req, res) => {
  const { token, region } = req.body;
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//! SETUP SOCKET //!
let dataText = [];
var nclient = 0;
io.sockets.on("connection", function (socket) {
  // console.log(socket);
  var id;
  socket.on("id", function (data) {
    socket.emit("inputResultFromUser", dataText);
    //    console.log(data);
    id = nclient;
    dataText[id] = [];
    nclient++;
  });

  //! WEBCAM ID ASSIGNEMENT

  socket.on("webcam_id", function (data) {
    socket.broadcast.emit("all_webcam_id", {
      session_id: socket.id,
      webcamId: data,
    });
    console.log(data);
  });

  //! WEBCAM MOVEMENT
  socket.on("webcam_move", function (data) {
    socket.broadcast.emit("all_webcam_moves", {
      session_id: socket.id,
      coords: data,
    });
    console.log(data, socket.id);
  });

  //! WEBCAM SIZE

  socket.on("webcam_size", function (data) {
    socket.broadcast.emit("all_webcam_sizes", {
      session_id: socket.id,
      coords: data,
    });
    // console.log(data);
  });

  //! CURSOR TRACKER

  socket.on("mouse_activity", function (data) {
    socket.broadcast.emit("all_mouse_activity", {
      session_id: socket.id,
      coords: data,
    });
    // console.log(data);
  });
});
