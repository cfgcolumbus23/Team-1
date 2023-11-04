const express = require("express");
const router = express.Router();
//const db = require("./config/db"); // import database connection from config/db.js
//const auth = require("./middleware/auth");
//const User = require("./models/user"); // import user model/schema
//const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const path = require("path");
const db = require('./connectToDB');

router.get("/", (req, res) => {
  res.render(`Navigate to /FirstPage`);
});

router.get("/FirstPage", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/FirstPage.html"));
});


router.get("/displayUser/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  db.each('SELECT * FROM users WHERE id=?', [id], (err, row) => {
    res.render(path.join(__dirname, "/views/displayUser.ejs"), {user: JSON.stringify(row)});
  });
})

module.exports = router;
