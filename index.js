const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./db");

const users = require("./routes/user");
const posts = require("./routes/post");

mongoose
  .connect(config.PDB, { useNewUrlParser: true })
  .then(
    () => console.log("Db connected"),
    err => console.log("DB connect Fail")
  );

const app = express();

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/posts", posts);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

app.get("/", (req, res) => res.send("hello"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
