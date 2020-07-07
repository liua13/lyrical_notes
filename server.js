const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const request = require("request");
const cors = require("cors");

const PORT = process.env.PORT || 8888;
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let client_id = process.env.client_id;
let client_secret = process.env.client_secret;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const requestAuthorization = () => {
  // your application requests authorization
  return {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };
};

app.post("/api/getTrackByGenre", (req, res) => {
  let authOptions = requestAuthorization();

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // generate random number for offset [0, 1950] and limit [15, 20]
      let { genre } = req.body;
      let randomOffset = Math.floor(Math.random() * 1000);
      let randomLimit = Math.floor(Math.random() * 16) + 10;

      // console.log("offset: ", randomOffset);
      // console.log("limit: ", randomLimit);

      // use the access token to access the Spotify Web API
      let token = body.access_token;
      let options = {
        url: "https://api.spotify.com/v1/search",
        headers: {
          Authorization: "Bearer " + token,
        },
        qs: {
          q: `genre: ${genre}`,
          type: "track",
          offset: randomOffset,
          limit: randomLimit,
        },
        json: true,
      };

      request.get(options, function (error, response, body) {
        res.send(body.tracks.items);
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
