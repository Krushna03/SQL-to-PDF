const sqlite3 = require('sqlite3').verbose();
const PDFDocument = require('pdfkit');
const fs = require('fs');

let db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.all("SELECT * FROM student", [], (err, rows) => {
  if (err) {
    throw err;
  }

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('student_data.pdf'));

  doc.fontSize(25).text('Student Data', {
    align: 'center'
  });

  doc.fontSize(12).text('ID', 50, 100);
  doc.text('Name', 100, 100);
  doc.text('Father Name', 200, 100);
  doc.text('Roll No', 350, 100);
  doc.text('Phone No', 450, 100);

  doc.moveTo(50, 120).lineTo(550, 120).stroke();

  let y = 140;
  rows.forEach((row) => {
    doc.text(row.id, 50, y);
    doc.text(row.name, 100, y);
    doc.text(row.fatherName, 200, y);
    doc.text(row.rollNo, 350, y);
    doc.text(row.phoneNo, 450, y);
    y += 20;
  });

  doc.end();
  console.log('PDF generated as "student_data.pdf".');

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
});
