const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yuseffufu1997',
  database: 'delta_timesheet'
});

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//test
//anothertester
//final test