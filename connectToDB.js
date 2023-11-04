const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hackathon2.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});

export default db;

/*
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  */