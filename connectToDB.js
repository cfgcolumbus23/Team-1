const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hackathon2.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});

// let sql = `SELECT Email email, Name name FROM users WHERE name = John`;
// //let playlistId = 1;

// // first row only
// db.all(sql, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row.name);
//   });
// });

module.exports = db;

/*
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  */