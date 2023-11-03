// in this file: connect to database
const mongoose = require("mongoose");
const mongoose_settings = { useNewUrlParser: true };

const uname = "admin-user";
const pword = "mfE5PBLWssqWWAyj";
const cluster = "cluster0.towxgfj";
const dbname = "messengerdb"; // defaults to "test" if left blank
// full URI of our DB connection
const uri = `mongodb+srv://${uname}:${pword}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// connect to the database and make a variable for our database connection
mongoose.connect(uri, mongoose_settings);
const db = mongoose.connection;

//  check the connection status
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("Connected successfully to MongoDB!");
  //console.log(db.collection("users").find().toArray());
  /*db.collection("users").find({email: "fake@email.com"}).toArray()
    .then(r => {
        console.log(r);
    }).catch(e => {
        console.error(`ERROR:`,e);
    })*/
});

module.exports = db;