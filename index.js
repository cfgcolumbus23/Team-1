const express = require("express");
const bodyParser = require("body-parser"); // add modules for parsing
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const upload = multer();
//const db = require("./config/db"); // import database connection from config/db.js
//const User = require("./models/user"); // import user model/schema
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-wwww-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(
  session({
    secret: "cfgFR5",
    resave: true,
    saveUninitialized: true,
    
  })
);

// Configure EJS as the template engine
//app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory


// Serve static files from the "public" directory
//app.use("/public", express.static("public"));
app.use(express.static(__dirname + "/public"));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Messenger app listening on port ${port}.`);
  console.log(`View on http://localhost:${port}.`);
});