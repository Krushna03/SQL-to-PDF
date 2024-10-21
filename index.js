const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connection made");
    }
});


db.run(`CREATE TABLE IF NOT EXISTS student(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  fatherName TEXT,
  rollNo TEXT,
  phoneNo TEXT
)`, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Table 'student' created successfully or already exists");
    }
});


db.run(`INSERT INTO student(name, fatherName, rollNo, phoneNo)
VALUES('Krushna', 'Shiv', '22', '8737438487')`, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Row inserted successfully into 'student' table");
    }
});


db.close((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("Database connection closed");
});
