const express = require("express");
const router = express.Router();
const cors = require("cors");
const ImageKit = require("imagekit");
const uuid = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { default: fetch } = require("node-fetch");
const { log } = require("console");

// const pugTemplatePath = path.join(__dirname, "../views/index.pug");
// const HtmlTemplatePath = path.join(__dirname, "../views/index.html");
// const EjsTemplatePath = path.join(__dirname, "../views/index.ejs");

// console.log(HtmlTemplatePath, " hey");
// const HtmlTemplatePath = path.join("../views/index.html");

const app = express();
app.use(cors());
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");

// app.use(express.static(__dirname + "/views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = (port = 3000, PUBLIC_KEY, PRIVATE_KEY, URL_ENDPOINT) => {
  return new Promise((resolve, reject) => {
    try {
      const imagekit = new ImageKit({
        publicKey: PUBLIC_KEY,
        privateKey: PRIVATE_KEY,
        urlEndpoint: URL_ENDPOINT,
      });

      router.get("/auth", (req, res) => {
        try {
          const token = req.query.token || uuid.v4();
          const expiration =
            req.query.expire || parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins

          const signatureObj = imagekit.getAuthenticationParameters(
            token,
            expiration
          );

          res.status(200).send(signatureObj);
          // console.log(signatureObj);
        } catch (err) {
          console.error(
            "Error while responding to auth request:",
            JSON.stringify(err, undefined, 2)
          );
          res.status(500).send("Internal Server Error");
        }
      });

      router.get("/", (req, res) => {
        try {
          res.render("../public/index.html", {
            publicKey: PUBLIC_KEY,
            urlEndpoint: URL_ENDPOINT,
            authenticationEndpoint: `http://localhost:3000/auth`,
          });

          // res.render(EjsTemplatePath, {
          //   publicKey: PUBLIC_KEY,
          //   urlEndpoint: URL_ENDPOINT,
          //   authenticationEndpoint: `http://localhost:3000/auth`,
          // });

          console.log(render, "render");
        } catch (err) {
          console.error(
            "Error while responding to static page request:",
            JSON.stringify(err, undefined, 2)
          );
          res.status(500).send("Internal Server Error");
        }
      });
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
          // body: JSON.stringify({
          //   // region: "eu001",
          // }),
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

        console.log(meetingId);

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

      app.use("/", router);

      app.listen(port, () => {
        console.info(`Auth server running on port ${port}.`);
        resolve();
      });
    } catch (err) {
      console.error(JSON.stringify(err, undefined, 2));
      reject("Error starting auth server.");
    }
  });
};

module.exports = {
  startServer,
};
