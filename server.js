const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT ||  3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//TESTER
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'yuseffufu1997',
//   database: 'delta_timesheet'
// });

// const db = mysql.createConnection({
//   host: '192.9.135.20',
//   user: 'root',
//   password: 'Sampoo200*Right',
//   database: 'timesheetdb'
// });

const db = mysql.createConnection('mysql://ozd0bkovhavllssk:mxpu3u1nc2383rdk@nnsgluut5mye50or.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ilfj45dihmmqskou');
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/timesheet', (req, res) => {
    const sql = 'SELECT  *  FROM employee_data';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

app.post('/submit', (req, res) => {
  const { name, hours } = req.body;

  const sql = 'INSERT INTO employee_data (name, work_hours) VALUES (?, ?)';
  db.query(sql, [name, hours], (err, result) => {
    if (err) throw err;
    console.log('Data inserted successfully');
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//test
//anothertester
//final test