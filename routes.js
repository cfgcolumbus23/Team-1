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

/*

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/protected_page", auth.checkSignIn, (req, res) => {
  res.render("protected_page", { user: req.session.user });
});

router.get("/edit_profile", auth.checkSignIn, (req, res) => {
  let userInfo = req.session.user;
  res.render("edit_profile", { user: userInfo });
});

router.post("/register", async (req, res) => {
  var regInfo = await req.body; // Get the parsed information

  const inputEmail = regInfo.email_box;
  const emailFilter = { email: inputEmail };
  const inputUser = regInfo.username_box;
  const userFilter = { userName: inputUser };
  const inputPass = regInfo.password_box[0];

  if (inputEmail == "" || inputUser == "" || inputPass == "") {
    console.log("Did not provide all necessary info");
  }

  const userExists = await User.findOne(userFilter);
  const emailExists = await User.findOne(emailFilter);

  if (userExists) {
    console.log("Username already in use");
    res.redirect("/register?UNameExists=true");
  } else if (emailExists) {
    console.log("Email already has an account");
    res.redirect("/register?EmailExists=true");
  } else {
    const hashedPass = await bcrypt.hash(inputPass, 10);
    var newUser = new User({
      email: inputEmail,
      userName: inputUser,
      userPass: hashedPass,
    });
    newUser
      .save()
      .then((result) => {
        req.session.user = newUser;
        console.log(`New user added: ${newUser}`);
        console.log(
          `SESSION STARTED, user: ${JSON.stringify(req.session.user)}\n`
        );
        res.render("protected_page", { user: newUser });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
});

router.post("/login", async (req, res) => {
  var regInfo = await req.body; // Get the parsed information

  const inputUser = regInfo.username_box;
  const userFilter = { userName: inputUser };
  const inputPass = regInfo.password_box;

  if (inputUser == "" || inputPass == "") {
    console.log("Did not provide all necessary info");
    res.redirect("/login?nullInfo=true");
  }

  const loginUser = await User.findOne(userFilter);
  console.log(`loginUser: ${JSON.stringify(loginUser)}`);

  if (!loginUser) {
    console.log("Username does not exist");
    res.redirect("/login?wrongUName=true");
  } else {
    const passwordMatch = await bcrypt.compare(inputPass, loginUser.userPass);

    if (passwordMatch) {
      console.log("Correct login.");
      req.session.user = loginUser;
      console.log(
        `SESSION STARTED, user: ${JSON.stringify(req.session.user)}\n`
      );
      res.render("protected_page", { user: loginUser });
    } else {
      console.log("Incorrect password");
      res.redirect("/login?wrongPass=true");
    }
  }
});

router.post("/update_email", async (req, res) => {
  let regInfo = await req.body;
  let currUser = req.session.user;
  let userID = currUser._id;
  let newEmail = regInfo.email_box;

  if (!newEmail) {
    console.log("Did not provide all necessary info.");
    res.redirect("/edit_profile?nullInfo=true");
  }

  let emailFilter = { email: newEmail };
  const emailExists = await User.findOne(emailFilter);

  if (emailExists) {
    console.log("Email already in use");
    // PROBLEM: REDIRECT WORKS...MESSAGE ADDED TO HTML...BUT ERROR IN CONSOLE
    res.redirect("/edit_profile?EmailExists=true");
  } else {
    const filter = {};
    const update = {};
    filter["_id"] = userID;
    update["email"] = newEmail;

    const result = await User.updateOne(filter, update);
    console.log(`Update result: ${JSON.stringify(result)}`);

    // update user session
    req.session.user = await User.findById(userID);
    console.log(`UPDATED EMAIL: ${JSON.stringify(req.session.user)}.\n`);
    // perhaps pass message in here as to what happened??
    res.render("edit_profile", { user: req.session.user });
  }
});

router.post("/update_username", async (req, res) => {
  let regInfo = await req.body;
  let currUser = req.session.user;
  let userID = currUser._id;
  let newUserName = regInfo.username_box;

  if (!newUserName) {
    console.log("Did not provide all necessary info.");
    res.redirect("/edit_profile?nullInfo=true");
  }

  let userFilter = { userName: newUserName };
  const userExists = await User.findOne(userFilter);

  if (userExists) {
    console.log("Username taken.");
    // PROBLEM: REDIRECT WORKS...MESSAGE ADDED TO HTML...BUT ERROR IN CONSOLE
    res.redirect("/edit_profile?UNameExists=true");
  } else {
    const filter = {};
    const update = {};
    filter["_id"] = userID;
    update["userName"] = newUserName;

    const result = await User.updateOne(filter, update);
    console.log(`Update result: ${JSON.stringify(result)}`);

    // update user session
    req.session.user = await User.findById(userID);
    console.log(`UPDATED USERNAME: ${JSON.stringify(req.session.user)}.\n`);
    // perhaps pass message in here as to what happened??
    res.render("edit_profile", { user: req.session.user });
  }
});

router.post("/update_password", async (req, res) => {
  let regInfo = await req.body;
  let currUser = req.session.user;
  let userID = currUser._id;
  let newPass = regInfo.password_box[0];
 // console.log(newPass)

  if (!newPass) {
    console.log("Did not provide all necessary info.");
    res.redirect("/edit_profile?nullInfo=true");
  } else {
    let hashedPass = await bcrypt.hash(newPass, 10);
    const filter = {};
    const update = {};
    filter["_id"] = userID;
    update["userPass"] = hashedPass;

    const result = await User.updateOne(filter, update);
    console.log(`Update result: ${JSON.stringify(result)}`);

    // update user session
    req.session.user = await User.findById(userID);
    console.log(`UPDATED PASSWORD: ${JSON.stringify(req.session.user)}.\n`);
    res.render("edit_profile", { user: req.session.user });
  }
});

router.post("/logout", (req, res) => {
  let userSesh = req.session.user;
  req.session.destroy(() => {
    console.log(`LOG OUT: User ${JSON.stringify(userSesh)} logged out.\n`);
  });
  res.redirect("/login?logout=true");
});


// This is the route when the user_search box is empty
router.get("/user_search", jsonParser, async (req, res) => {

  res.status(200).json({success : true, users : []});

});

// This is the route when the user_search has a filter
router.get("/user_search/:filter", jsonParser, async (req, res) => {

  var filter = req.params.filter;

  var allUsers = await findUsers(filter);

  console.log(JSON.stringify(allUsers));

  var allUserNamesList = [];

  for await (const user of allUsers){
    allUserNamesList.push(user.userName);
  }

  console.log(`All of the users: ${allUserNamesList}`);

  res.status(200).json({success : true, users : allUserNamesList});
  
});
*/

module.exports = router;
